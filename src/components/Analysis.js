import {AnalysisWrapper, Wrapper} from "../GlobalStyles";
import LocationFilter from "./LocationFilter";
import Intro from "./Intro";
import NoiseStatisticCard from "./NoiseStatisticCard";
import {AnalysisBarChartsContainer} from "./AnalysisBarChart/AnalysisBarChart.styles";
import AnalysisBarChart from "./AnalysisBarChart";
import {useEffect, useState} from "react";
import * as API from "../API";

const introText = "Select a city to view a summary of the noise levels in this city";

const Analysis = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [analysis, setAnalysis] = useState([]);

    const fetchAnalysis = async () => {
        const analysis = await API.fetchAnalysis();
        setAnalysis(analysis);
        setIsLoading(false);
    }

    useEffect(() => {
        if (!isLoading) return;
        fetchAnalysis();
    }, [isLoading]);

    return (
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
                    <AnalysisBarChart title='Daily Average' metric='average_noise' analysis={analysis}/>
                    <AnalysisBarChart title='Total Exceedances' metric='total_exceedances' analysis={analysis}/>
                </AnalysisBarChartsContainer>
            </AnalysisWrapper>
        </>
    );
}

export default Analysis;
