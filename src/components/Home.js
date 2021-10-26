import Banner from "./Banner";
import BannerImage from "../images/banner.png";
import Overlay from "../images/overlay.png";
import Intro from "./Intro";

const Home = () => {
    return (
        <>
            <Banner overlay={Overlay} image={BannerImage}/>
            <Intro/>
        </>
    );
};

export default Home;
