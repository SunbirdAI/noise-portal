import Intro from "./Intro";
import HomePageMap from "./HomePageMap";
import {Wrapper} from "../GlobalStyles";
import LocationFilter from "./LocationFilter";
import {NoiseLevelKey} from "./NoiseLevelKey";

const introText = "Welcome to the Sunbird AI Noise Dashboard. On this page, you can track noise levels across Kampala and Entebbe.";

const Home = () => {
    return (
        <Wrapper>
            <Intro text={introText}/>
            <LocationFilter/>
            <HomePageMap/>
            <NoiseLevelKey/>
        </Wrapper>
    );
};

export default Home;
