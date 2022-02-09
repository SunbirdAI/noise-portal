import Intro from "./Intro";
import HomePageMap from "./HomePageMap";
import {Wrapper} from "../GlobalStyles";
import LocationFilter from "./LocationFilter";
import {NoiseLevelKey} from "./NoiseLevelKey";

const Home = () => {
    return (
        <Wrapper>
            <Intro/>
            <LocationFilter/>
            <HomePageMap/>
            <NoiseLevelKey/>
        </Wrapper>
    );
};

export default Home;
