import Intro from "./Intro";
import HomePageMap from "./HomePageMap";
import {Wrapper} from "../GlobalStyles";
import LocationFilter from "./LocationFilter";
import {NoiseLevelKey} from "./NoiseLevelKey";
import {useEffect, useState} from "react";
import * as API from "../API";
import {getLocationMetricsURL} from "../API";

const introText = "Welcome to the Sunbird AI Noise Dashboard. On this page, you can track noise levels across Kampala and Entebbe.";

const Home = () => {
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // const fetchLocations = () => {
    //     axios.get(LOCATIONS_URL)
    //         .then((res) => {
    //             setLocations(res.data);
    //         })
    //
    // };

    const fetchLocations = async () => {
        const locs = await API.fetchLocations();
        for (let i = 0; i < locs.length; i++) {
            const id = locs[i].id;
            console.log(getLocationMetricsURL(id));
            locs[i]['metrics'] = await API.fetchLocationMetrics(id);
            locs[i]['noise_level'] = locs[i]['metrics'][0].db_level;
        }
        setLocations(locs);
        setIsLoading(false);
        console.log(locs);
    }

    useEffect(() => {
        if(!isLoading) return;
        fetchLocations();
    }, [isLoading]);

    return (
        <Wrapper>
            <Intro text={introText}/>
            <LocationFilter locations={locations}/>
            <HomePageMap locations={locations}/>
            <NoiseLevelKey/>
        </Wrapper>
    );
};

export default Home;
