import Intro from "./Intro";
import HomePageMap from "./HomePageMap";
import {Wrapper} from "../GlobalStyles";
import LocationFilter from "./LocationFilter";

const Home = () => {
    return (
        <Wrapper>
            <Intro/>
            <LocationFilter/>
            <HomePageMap/>
        </Wrapper>
    );
};

export default Home;
