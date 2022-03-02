import {AnalysisWrapper} from "../GlobalStyles";
import NoiseLevelCard, {GenericNumberCard} from "./NoiseLevelCard";
import {useLocation} from "react-router-dom";
import {CardTitle, GenericNumberCardContainer, LocationNameText} from "./NoiseLevelCard/LocationCard.styles";
import NoiseLevelChart from "./NoiseLevelChart";
import NoiseCategoryChart from "./NoiseCategoryChart";
import {useState} from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DefinedRange from "react-date-range/dist/components/DefinedRange";
import {timeFormat} from 'd3-time-format';

const today = new Date();
const pastDay = new Date();
pastDay.setDate(new Date().getDate() - 1);
const hourFormat = timeFormat("%a %I:%M %p");
const dayFormat = timeFormat("%a %d %b");


const daysBetween = (firstDate, secondDate) => (
    Math.round(Math.abs(firstDate.getTime() - secondDate.getTime()) / (24 * 60 * 60 * 1000))
);

const getTimeFormat = (startDate, endDate) => {
    const numOfDaysBetween = daysBetween(startDate, endDate);
    if (numOfDaysBetween <= 2) return hourFormat;
    else return dayFormat;
}

const filterMetrics = (metrics, startDate, endDate) => {
    const start = startDate.getTime();
    const end = endDate.getTime();

    return metrics.filter(metric => metric.time_uploaded >= start && metric.time_uploaded <= end)
}

export const getLatestMetric = (metrics) => (metrics.reduce((prev, current) =>
    prev.time_uploaded > current.time_uploaded ? prev : current
));

const getTotalExceedances = (metrics) =>
    (metrics.reduce((prev, current) => prev + current.no_of_exceedances, 0));

const Location = () => {
    const route = useLocation();
    const {location} = route.state;
    const [dateState, setDateState] = useState([
        {
            startDate: pastDay,
            endDate: today,
            key: 'selection'
        }
    ]);

    const initialMetrics = filterMetrics(location.metrics, pastDay, today);

    const [metricsState, setMetricsState] = useState({
        metrics: initialMetrics,
        timeFormat: getTimeFormat(pastDay, today),
        latestMetric: getLatestMetric(location.metrics),
        totalExceedances: getTotalExceedances(initialMetrics)
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

    return (
        <AnalysisWrapper>
            <LocationNameText>{location.name}</LocationNameText>
            <NoiseLevelCard value={Math.round(metricsState.latestMetric.avg_db_level)}
                            title={"Average (Past 30 minutes)"}/>
            <NoiseLevelCard value={Math.round(metricsState.latestMetric.max_db_level)}
                            title={"Maximum (Past 30 minutes)"}/>
            <GenericNumberCard title={"Exceedances (For time Period Selected)"} value={metricsState.totalExceedances}/>
            <GenericNumberCardContainer>
                <CardTitle>Choose a time range</CardTitle>
                <DefinedRange
                    onChange={onDateFilterChanged}
                    // showSelectionPreview={true}
                    // moveRangeOnFirstSelection={false}
                    // months={1}
                    ranges={dateState}
                    direction="horizontal"
                />
            </GenericNumberCardContainer>
            <NoiseLevelChart metrics={metricsState.metrics} timeFormat={metricsState.timeFormat}/>
            <NoiseCategoryChart/>
        </AnalysisWrapper>
    )
};

export default Location;
