import Intro from "./Intro";
import HomePageMap from "./HomePageMap";
import {Wrapper} from "../GlobalStyles";
import LocationFilter from "./LocationFilter";
import {NoiseLevelKey} from "./NoiseLevelKey";
import {useEffect, useState} from "react";
import * as API from "../API";
import {useSearchParams} from "react-router-dom";
import {Oval} from "react-loader-spinner";
import LoaderSpinner from "./LoaderSpinner";

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
    const [searchParams, setSearchParams] = useSearchParams();
    const city = searchParams.get('city');
    const [selectedCity, setSelectedCity] = useState(city ? city : '');
    const options = getLocationOptions(unfilteredLocations);

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
            {isLoading ? <LoaderSpinner span={2}/> : <HomePageMap locations={locations}/>}
            <NoiseLevelKey/>
        </Wrapper>
    );
};

export default Home;
