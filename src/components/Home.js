import Banner from "./Banner";
import BannerImage from "../images/banner.png";
import Overlay from "../images/overlay.png";

const Home = () => {
    return (
        <>
            <Banner overlay={Overlay} image={BannerImage}/>
        </>
    );
};

export default Home;
