import Intro from "./Intro";
import HomePageMap from "./HomePageMap";
import {Wrapper} from "../GlobalStyles";
import LocationFilter from "./LocationFilter";
import {NoiseLevelKey} from "./NoiseLevelKey";
import {useEffect, useState} from "react";
import * as API from "../API";
import {getLocationMetricsURL} from "../API";
import {getLatestMetric} from "./Location";
import {useSearchParams} from "react-router-dom";

const introText = "Welcome to the Sunbird AI Noise Dashboard. On this page, you can track noise levels across Kampala and Entebbe.";


const filterMetrics = (metrics) => {
    const today = new Date();
    const last2Weeks = new Date();
    last2Weeks.setDate(today.getDate() - 14);
    return metrics.filter((metric) => metric.time_uploaded >= last2Weeks.getTime());
}

const getLocationOptions = (locations) => {
    const cities = new Set(locations.map(location => location.city));
    const options = [...cities].map((city) => ({
        value: `${city}`,
        label: `${city}`
    }));
    options.push({
        value: '',
        label: 'All Cities'
    })
    return options;
}

const Home = () => {
    const [unfilteredLocations, setUnfilteredLocations] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const city = searchParams.get('city');
    const [selectedCity, setSelectedCity] = useState(city ? city : '');
    const options = getLocationOptions(unfilteredLocations);
    console.log(locations, selectedCity);

    const filterLocationsByCity = (city) => {
        if (selectedCity === '') setLocations([...unfilteredLocations]);
        else {
            setLocations(unfilteredLocations.filter(location => location.city === city));
        }
    };

    const fetchLocations = async () => {
        const locs = await API.fetchLocations();
        for (let i = 0; i < locs.length; i++) {
            locs[i]['noise_level'] = Math.round(locs[i]['latest_metric']['db_level']);
        }
        setUnfilteredLocations(locs);
        setIsLoading(false);
        // console.log(locs);
    }

    useEffect(() => {
        if (!isLoading) return;
        fetchLocations();
    }, [isLoading]);

    useEffect(() => {
        if (unfilteredLocations) filterLocationsByCity(selectedCity);
        setSearchParams(selectedCity === '' ? {} : {city: selectedCity});
    }, [selectedCity, unfilteredLocations]);

    return (
        <Wrapper>
            <Intro text={introText}/>
            <LocationFilter
                selectedOption={options[options.length - 1]}
                setSelectedCity={setSelectedCity}
                options={options}/>
            <HomePageMap locations={locations}/>
            <NoiseLevelKey/>
        </Wrapper>
    );
};

export default Home;
