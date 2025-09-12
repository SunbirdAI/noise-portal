import Intro from "./Intro";
import HomePageMap from "./HomePageMap";
import {Wrapper} from "../GlobalStyles";
import LocationFilter from "./LocationFilter";
import {NoiseLevelKey} from "./NoiseLevelKey";
import {useEffect, useState} from "react";
import * as API from "../API";
import LoaderSpinner from "./LoaderSpinner";
import { useSearchParams } from "react-router-dom";

const introText = "Welcome to the Sunbird AI Noise Dashboard. On this page, you can track noise levels across Kampala and Entebbe.";

const getLocationOptions = (locations) => {
    const cities = new Set(locations.map(location => location.city));
    const optionsMap = new Map();
    [...cities].forEach(city =>
        optionsMap.set(city, {
            value: `${city}`,
            label: `${city}`
        })
    );
    optionsMap.set('', {
        value: '',
        label: 'All Cities'
    });

    return optionsMap;
}

const Home = () => {
    const [unfilteredLocations, setUnfilteredLocations] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const city = searchParams.get('city');
    const [selectedCity, setSelectedCity] = useState(city ? city : '');
    const options = getLocationOptions(unfilteredLocations);
    const [deviceDetailsMap, setDeviceDetailsMap] = useState({});

    const fetchLocations = async () => {
        try {
            setError(null);
            const locs = await API.fetchHomePageData();
            
            if (!locs || locs.length === 0) {
                console.warn('No location data available');
                setUnfilteredLocations([]);
                setIsLoading(false);
                return;
            }
            
            // Process locations data
            for (let i = 0; i < locs.length; i++) {
                // Ensure metrics exist before accessing
                if (locs[i].metrics && locs[i].metrics.location_hourly_metrics && locs[i].metrics.location_hourly_metrics.length > 0) {
                    locs[i]['noise_level'] = Math.round(locs[i]['metrics']['location_hourly_metrics'][0]['hourly_avg_db_level']);
                } else if (locs[i].noise_level) {
                    // Use existing noise_level if available (fallback data or API data)
                    locs[i]['noise_level'] = Math.round(locs[i]['noise_level']);
                } else {
                    // Default noise level if no data available
                    locs[i]['noise_level'] = 45;
                }
                
                // Ensure name exists
                if (!locs[i].name && locs[i].parish && locs[i].division) {
                    locs[i]['name'] = `${locs[i]['parish']}, ${locs[i]['division']}`;
                } else if (!locs[i].name) {
                    locs[i]['name'] = `Location ${i + 1}`;
                }
            }
            
            setUnfilteredLocations(locs);
            setIsLoading(false);
            console.log('Location data loaded successfully:', locs.length, 'locations');
            return locs;
        } catch (error) {
            console.error('Error fetching locations:', error);
            setError('Failed to load location data. Please try again later.');
            setIsLoading(false);
            return [];
        }
    }

    // Fetch device details for all locations
    const fetchDeviceDetailsForLocations = async (locs) => {
        const detailsArr = await Promise.all(
            locs.map(async (location) => {
                const deviceName = location.device_name ?? location.name ?? "";
                const sensorType = API.detectSensorType(deviceName);
                if (sensorType === "MCU") {
                    const details = await API.getMCUDeviceDetails(deviceName);
                    const metrics = details.get_metrics || [];
                    const latestMetric = metrics.sort((a, b) => new Date(b.time_uploaded) - new Date(a.time_uploaded))[0];
                    const avgDbLevel = latestMetric ? latestMetric.avg_db_level : null;
                    return [location.id, { type: "mcu", data: details, avgDbLevel }];
                } else if (sensorType === "AI") {
                    const [inference, environment] = await Promise.all([
                        API.getAISoundInference(deviceName),
                        API.getAIEnvironmentalParams(deviceName),
                    ]);
                    return [location.id, { type: "ai", inference, environment }];
                } else {
                    return [location.id, { type: "unknown" }];
                }
            })
        );
        setDeviceDetailsMap(Object.fromEntries(detailsArr));
    };

    useEffect(() => {
        const fetchAll = async () => {
            setIsLoading(true);
            setError(null);
            const locs = await fetchLocations();
            if (locs && locs.length > 0) {
                await fetchDeviceDetailsForLocations(locs);
            }
            setIsLoading(false);
        };
        fetchAll();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const filterLocationsByCity = (city) => {
            if (selectedCity === '') setLocations([...unfilteredLocations]);
            else {
                setLocations(unfilteredLocations.filter(location => location.city === city));
            }
        };

        if (unfilteredLocations) filterLocationsByCity(selectedCity);
        setSearchParams(selectedCity === '' ? {} : {city: selectedCity});
    }, [selectedCity, unfilteredLocations, setSearchParams]);

    return (
        <Wrapper>
            <Intro text={introText}/>
            <LocationFilter
                selectedOption={options.get(selectedCity)}
                setSelectedCity={setSelectedCity}
                options={[...options.values()]}/>
            {error && (
                <div style={{ 
                    color: 'red', 
                    textAlign: 'center', 
                    padding: '20px',
                    backgroundColor: '#ffebee',
                    margin: '20px 0',
                    borderRadius: '5px'
                }}>
                    {error}
                </div>
            )}
            {isLoading ? <LoaderSpinner span={2}/> : 
                <HomePageMap 
                    locations={locations} 
                    deviceDetailsMap={deviceDetailsMap} 
                />
            }
            <NoiseLevelKey/>
        </Wrapper>
    );
};

export default Home;
