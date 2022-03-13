import Intro from "./Intro";
import HomePageMap from "./HomePageMap";
import {Wrapper} from "../GlobalStyles";
import LocationFilter from "./LocationFilter";
import {NoiseLevelKey} from "./NoiseLevelKey";
import {useEffect, useState} from "react";
import * as API from "../API";
import {getLocationMetricsURL} from "../API";
import {getLatestMetric} from "./Location";

const introText = "Welcome to the Sunbird AI Noise Dashboard. On this page, you can track noise levels across Kampala and Entebbe.";

const transformMetrics = (metrics) => {
    metrics.forEach(metric => {
        metric['time_uploaded'] = new Date(metric['time_uploaded']).getTime()
    });
};

const filterMetrics = (metrics) => {
    const today = new Date();
    const last2Weeks = new Date();
    last2Weeks.setDate(today.getDate() - 14);
    return metrics.filter((metric) => metric.time_uploaded >= last2Weeks.getTime());
}

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
            // const id = locs[i].id;
            // console.log(getLocationMetricsURL(id));
            // locs[i]['metrics'] = await API.fetchLocationMetrics(id);
            // transformMetrics(locs[i]['metrics']);
            // locs[i]['metrics'] = filterMetrics(locs[i]['metrics']);
            // locs[i]['noise_level'] = getLatestMetric(locs[i]['metrics']).avg_db_level;
            locs[i]['noise_level'] = Math.round(locs[i]['latest_metric']['db_level']);
        }
        setLocations(locs);
        setIsLoading(false);
        console.log(locs);
    }

    useEffect(() => {
        if (!isLoading) return;
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
