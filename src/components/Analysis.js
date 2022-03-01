import {AnalysisWrapper, Wrapper} from "../GlobalStyles";
import LocationFilter from "./LocationFilter";
import Intro from "./Intro";
import NoiseStatisticCard from "./NoiseStatisticCard";
import {AnalysisBarChartsContainer} from "./AnalysisBarChart/AnalysisBarChart.styles";
import AnalysisBarChart from "./AnalysisBarChart";

const introText = "Select a city to view a summary of the noise levels in this city";

const Analysis = () => (
    <>
        <Wrapper>
            <Intro text={introText}/>
            <LocationFilter locations={[]}/>
        </Wrapper>
        <AnalysisWrapper>
            <NoiseStatisticCard title={"Quiet Areas"} value={8} noise_range={0}/>
            <NoiseStatisticCard title={"Moderately Noisy Areas"} value={8} noise_range={1}/>
            <NoiseStatisticCard title={"Very Noisy Areas"} value={8} noise_range={2}/>
            <AnalysisBarChartsContainer>
                <AnalysisBarChart title='Daily Average' metric='average_noise'/>
                <AnalysisBarChart title='Total Exceedances' metric='total_exceedances'/>
            </AnalysisBarChartsContainer>
        </AnalysisWrapper>
    </>
);

export default Analysis;
