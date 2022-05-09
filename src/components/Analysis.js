import {AnalysisWrapper, Wrapper} from "../GlobalStyles";
import LocationFilter from "./LocationFilter";
import Intro from "./Intro";
import NoiseStatisticCard from "./NoiseStatisticCard";
import {AnalysisBarChartsContainer} from "./AnalysisBarChart/AnalysisBarChart.styles";
import {ExceedanceBarChartsContainer} from "./ExceedanceBarChart/ExceedanceBarChart.styles";
import AnalysisBarChart from "./AnalysisBarChart";
import ExceedanceBarChart from "./ExceedanceBarChart";
import {useEffect, useState} from "react";
import * as API from "../API";

const introText = "Select a city to view a summary of the noise levels in this city";

const Analysis = () => {
    const [analysis, setAnalysis] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAnalysis = async () => {
        const response = await API.fetchAnalysis();
        const analysis = response.map(({ location: { parish, noise_analysis } }) => ({
            day_time_average: noise_analysis.day_time_average,
            day_time_median: noise_analysis.day_time_median,
            night_time_average: noise_analysis.night_time_average,
            night_time_median: noise_analysis.night_time_median,
            day_time_exceedances: noise_analysis.day_time_exceedances,
            night_time_exceedances: noise_analysis.night_time_exceedances,
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
                    <AnalysisBarChart title='Noise Analysis (3-day period)' metrics={analysis}
                        day_time_average='day_time_average'
                        day_time_median='day_time_median'
                        night_time_average='night_time_average'
                        night_time_median='night_time_median'
                        analysis={analysis}
                    />
                    <ExceedanceBarChart title='Exceedances (3-day period)'
                        day_time_exceedances='day_time_exceedances'
                        night_time_exceedances='night_time_exceedances'
                        analysis={analysis}
                    />
                </AnalysisBarChartsContainer>
            </AnalysisWrapper>
        </>
    );
}

export default Analysis;
