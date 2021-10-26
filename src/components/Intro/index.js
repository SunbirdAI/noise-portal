import {
    Box,
    CloudIcon,
    Feature, Features,
    FeaturesRow,
    IntroText,
    MapMarkerIcon,
    MicrophoneIcon,
    RobotIcon,
    Wrapper
} from "./Intro.styles";

const Intro = () => (
    <Wrapper>
        <Box>
            <IntroText>
                <h2>Using Artificial Intelligence to monitor and categorize noise pollution in Kampala.</h2>
                <p>We are building a noise monitoring system using low cost sensors powered by AI that are deployed
                    throughout strategic places in cities that can capture, quantify and provide actionable information
                    about environmental noise in Kampala.</p>
            </IntroText>
            <Features>
                <FeaturesRow>
                    <Feature>
                        <MicrophoneIcon/>
                        <h3><a href="/">Sensors</a></h3>
                        <p>Learn about how we are developing low-cost sensors that can detect and categorize noise.</p>
                    </Feature>
                    <Feature>
                        <RobotIcon/>
                        <h3><a href="/">Models</a></h3>
                        <p>Look at the current results from the models we've trained and view the code and the
                            notebooks</p>
                    </Feature>
                </FeaturesRow>
                <FeaturesRow>
                    <Feature>
                        <CloudIcon/>
                        <h3><a href="/">Data</a></h3>
                        <p>Explore and download the categorized noise samples we've collected from using mobile phones
                            and
                            sensors.</p>
                    </Feature>
                    <Feature>
                        <MapMarkerIcon/>
                        <h3><a href="/">Map</a></h3>
                        <p>Explore the interactive map of the noise samples collected around Kampala city.</p>
                    </Feature>
                </FeaturesRow>
            </Features>
        </Box>
    </Wrapper>
);

export default Intro;
