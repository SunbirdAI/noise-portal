import {AnalysisWrapper, Wrapper} from "../GlobalStyles";
import LocationFilter from "./LocationFilter";
import Intro from "./Intro";
import NoiseStatisticCard from "./NoiseStatisticCard";

const introText = "Select a city to view a summary of the noise levels in this city";

const Analysis = () => (
    <>
        <Wrapper>
            <Intro text={introText}/>
            <LocationFilter/>
        </Wrapper>
        <AnalysisWrapper>
            <NoiseStatisticCard title={"Quiet Areas"} value={8} noise_range={0}/>
            <NoiseStatisticCard title={"Moderately Noisy Areas"} value={8} noise_range={1}/>
            <NoiseStatisticCard title={"Very Noisy Areas"} value={8} noise_range={2}/>
        </AnalysisWrapper>
    </>
);

export default Analysis;
