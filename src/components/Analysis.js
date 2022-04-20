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
    const [analysis, setAnalysis] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAnalysis = async () => {
        const response = await API.fetchAnalysis();
        const analysis = response.map(({ location: { parish, noise_analysis} }) => ({
            day_time_average: noise_analysis.day_time_average,
            day_time_median: noise_analysis.day_time_median,
            // division: parish ? `${parish}, ${division}` : division,
            parish: parish
        }));
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
                    <AnalysisBarChart title='Daily Average' metric='day_time_average' analysis={analysis}/>
                    <AnalysisBarChart title='Daily Median' metric='day_time_median' analysis={analysis}/>
                </AnalysisBarChartsContainer>
            </AnalysisWrapper>
        </>
    );
}

export default Analysis;
