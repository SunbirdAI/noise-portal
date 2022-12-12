import {AnalysisWrapper} from "../GlobalStyles";
import NoiseLevelCard, {GenericNumberCard} from "./NoiseLevelCard";
import {useLocation} from "react-router-dom";
import {CardTitle, GenericNumberCardContainer, LocationNameText, InfoCardContainer} from "./NoiseLevelCard/LocationCard.styles";
import NoiseLevelChart from "./NoiseLevelChart";
import NoiseCategoryChart from "./NoiseCategoryChart";
import {useEffect, useState} from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DefinedRange from "react-date-range/dist/components/DefinedRange";
import {timeFormat} from 'd3-time-format';
import * as API from "../API";
import LoaderSpinner from "./LoaderSpinner";

const today = new Date();
const pastMonth = new Date();
pastMonth.setDate(new Date().getDate() - 30);
const pastDay = new Date();
pastDay.setDate(pastDay.getDate() - 1);
const hourFormat = timeFormat("%a %I:%M %p");
const dayFormat = timeFormat("%a %d %b");


const daysBetween = (firstDate, secondDate) => (
    Math.round(Math.abs(firstDate.getTime() - secondDate.getTime()) / (24 * 60 * 60 * 1000))
);

const getTimeFormat = (startDate, endDate) => {
    const numOfDaysBetween = daysBetween(startDate, endDate);
    // console.log(`Number of days between: ${numOfDaysBetween}`);
    if (numOfDaysBetween <= 2) return hourFormat;
    else return dayFormat;
}

const filterMetrics = (metrics, startDate, endDate) => {
    const start = startDate.getTime();
    const end = endDate.getTime();
    return metrics.filter(metric => metric.date >= start && metric.date <= end)
}

export const getLatestMetric = (metrics) => (metrics.reduce((prev, current) =>
    prev.time_uploaded > current.time_uploaded ? prev : current
));

const getTotalExceedances = (metrics) =>
    (metrics.reduce((prev, current) => prev + current.no_of_exceedances, 0));

const getLocationName = (location) => `${location.parish}, ${location.division}, ${location.city}`;

const transformMetrics = (metrics) => {
    metrics.forEach(metric => {
        metric['date'] = new Date(metric['date']).getTime();
    });
};

const Location = () => {
    const route = useLocation();
    const {location} = route.state;
    console.log(location);
    transformMetrics(location.metrics['location_daily_metrics']);
    transformMetrics(location.metrics['location_hourly_metrics']);
    const [dateState, setDateState] = useState([
        {
            startDate: pastMonth,
            endDate: today,
            key: 'selection'
        }
    ]);
    // const [isLoading, setIsLoading] = useState(true);

    // const initialMetrics = filterMetrics(location.metrics, pastDay, today);

    const [metricsState, setMetricsState] = useState({
        dailyMetrics: location.metrics["location_daily_metrics"],
        hourlyMetrics: location.metrics["location_hourly_metrics"],
        dailyTimeFormat: getTimeFormat(pastMonth, today),
        hourlyTimeFormat: getTimeFormat(pastDay, today),
        latestMetric: location.metrics["location_hourly_metrics"][0],
        totalExceedances: 0
    });

    const onDateFilterChanged = (item) => {
        const startDate = item.selection.startDate, endDate = item.selection.endDate;
        setDateState([item.selection]);
        const newMetrics = filterMetrics(location.metrics, startDate, endDate);
        setMetricsState({
            ...metricsState,
            metrics: newMetrics,
            timeFormat: getTimeFormat(startDate, endDate),
            totalExceedances: getTotalExceedances(newMetrics)
        });
    }

    // const fetchMetrics = async () => {
    //     const metrics = await API.fetchLocationMetrics(location.id);
    //     transformMetrics(metrics);
    //     location.metrics = metrics;
    //     setMetricsState({
    //         ...metricsState,
    //         metrics: filterMetrics(location.metrics, pastDay, today),
    //         latestMetric: metrics[0],
    //         totalExceedances: getTotalExceedances(metrics)
    //     });
    //     setIsLoading(false);
    // }

    // useEffect(() => {
    //     if (!isLoading) return;
    //     // fetchMetrics();
    // }, [isLoading]);

    return (
        <AnalysisWrapper>
            <LocationNameText>{getLocationName(location)}</LocationNameText>
            {
                // isLoading ? <LoaderSpinner span={3}/> :
                    <>
                        <InfoCardContainer>
                            <CardTitle>Location Information</CardTitle>
                            <p className="p-2"><span
                                className="font-bold">Area description</span>: {location.location_description}</p>
                            <p className="p-2"><span className="font-bold">Daytime Limit</span>: {location.day_limit}dB
                            </p>
                            <p className="p-2"><span
                                className="font-bold">Night-time Limit</span>: {location.night_limit}dB</p>
                            <p className="p-2">The above limits are as recommended in the
                                <a className="text-blue-600"
                                   href="http://nema.go.ug/sites/all/themes/nema/docs/noise_standards_and_control_regulations.pdf">
                                    NEMA Noise Standards and Control Regulations
                                </a></p>
                        </InfoCardContainer>
                        <InfoCardContainer/>
                        <NoiseLevelCard value={Math.round(metricsState.latestMetric.hourly_avg_db_level)}
                                        title={"Last Hour Average"}/>
                        <NoiseLevelCard value={Math.round(metricsState.latestMetric.hourly_max_db_level)}
                                        title={"Last Hour Maximum"}/>
                        <NoiseLevelCard title={"Last Hour Median"}
                                           value={Math.round(metricsState.latestMetric.hourly_median_db_level)}/>
                        <GenericNumberCard title={"Last Hour Exceedances"}
                                           value={metricsState.latestMetric.hourly_no_of_exceedances}/>
                        {/*<GenericNumberCardContainer>*/}
                        {/*    <CardTitle>Choose a time range</CardTitle>*/}
                        {/*    <DefinedRange*/}
                        {/*        onChange={onDateFilterChanged}*/}
                        {/*        // showSelectionPreview={true}*/}
                        {/*        // moveRangeOnFirstSelection={false}*/}
                        {/*        // months={1}*/}
                        {/*        ranges={dateState}*/}
                        {/*        direction="horizontal"*/}
                        {/*    />*/}
                        {/*</GenericNumberCardContainer>*/}
                        {/*<NoiseCategoryChart/>*/}
                        <NoiseLevelChart
                            title={"Daily and Nightly Noise Levels Overtime"}
                            metrics={metricsState.dailyMetrics}
                            lines={["daily_avg_db_level", "daily_median_db_level", "daily_max_db_level"]}
                            timeFormat={metricsState.dailyTimeFormat}
                            dayLimit={location.day_limit}
                            nightLimit={location.night_limit}
                        />
                        <NoiseLevelChart
                            title={"Hourly Noise Levels (Past 24 hours)"}
                            metrics={filterMetrics(metricsState.hourlyMetrics, pastDay, today)}
                            lines={["hourly_avg_db_level", "hourly_median_db_level", "hourly_max_db_level"]}
                            timeFormat={metricsState.hourlyTimeFormat}
                            dayLimit={location.day_limit}
                            nightLimit={location.night_limit}
                        />
                    </>
            }
        </AnalysisWrapper>
    )
};

export default Location;
