import {AnalysisWrapper} from "../GlobalStyles";
import NoiseLevelCard, {GenericNumberCard} from "./NoiseLevelCard";
import {useLocation} from "react-router-dom";
import {CardTitle, LocationNameText, InfoCardContainer} from "./NoiseLevelCard/LocationCard.styles";
import NoiseLevelChart from "./NoiseLevelChart";
import HourlyNoiseHeatMap from "./HourlyNoiseHeatMap";
import {timeFormat} from 'd3-time-format';
import {detectSensorType, getMCUDeviceDetails, getAISoundInference, getAIEnvironmentalParams} from "../API";
import {useEffect, useState} from "react";
// Placeholder components for AI sensor charts
const AISoundInferenceChart = ({data}) => (
    <div style={{margin: '1rem 0'}}>
        <CardTitle>AI Sound Inference Data</CardTitle>
        {/* Replace with actual chart implementation */}
        <pre style={{background: '#f6f6f6', padding: '1rem'}}>{JSON.stringify(data, null, 2)}</pre>
    </div>
);
const AIEnvironmentalParamsChart = ({data}) => (
    <div style={{margin: '1rem 0'}}>
        <CardTitle>AI Environmental Parameters</CardTitle>
        {/* Replace with actual chart implementation */}
        <pre style={{background: '#f6f6f6', padding: '1rem'}}>{JSON.stringify(data, null, 2)}</pre>
    </div>
);

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

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getHeatMapData = (hourlyMetrics) => {
    const data = new Array(7).fill(0).map(() => new Array(24).fill(-1));
    const meta = new Array(7).fill(0).map(() => new Array(24).fill('No data'));
    hourlyMetrics.forEach((metric) => {
        const date = new Date(metric.date);
        const day = date.getDay();
        // const dayWord = days[day];
        // console.log(dayWord);
        const hour = (metric.hour + 3) % 24;
        const dbLevel = Math.round(metric.hourly_avg_db_level * 100) / 100;
        if(data[day][hour] === -1) {
            data[day][hour] = Math.round(metric.hourly_avg_db_level);
            meta[day][hour] = `Average DB Level = ${dbLevel} on ${date.toDateString()} at ${date.toTimeString()}`
        }
    });
    // console.log(`Hourly data: ${data[0]}`);
    return {
        'data': data,
        'meta': meta
    };
};

const filterMetrics = (metrics, startDate, endDate) => {
    const start = startDate.getTime();
    const end = endDate.getTime();
    return metrics.filter(metric => metric.date >= start && metric.date <= end)
}

// export const getLatestMetric = (metrics) => (metrics.reduce((prev, current) =>
//     prev.time_uploaded > current.time_uploaded ? prev : current
// ));

// const getTotalExceedances = (metrics) =>
//     (metrics.reduce((prev, current) => prev + current.no_of_exceedances, 0));

const getLocationName = (location) => `${location.parish}, ${location.division}, ${location.city}`;

const transformMetrics = (metrics) => {
    if (metrics && Array.isArray(metrics)) {
        metrics.forEach(metric => {
            metric['date'] = new Date(metric['date']).getTime();
        });
    }
};


const Location = () => {
    const route = useLocation();
    const {location} = route.state;
    // Sensor type detection
    const sensorType = detectSensorType(location?.device_name || location?.name || "");

    // State for MCU and AI sensor data
    const [mcuData, setMCUData] = useState(null);
    const [aiSoundInference, setAISoundInference] = useState(null);
    const [aiEnvParams, setAIEnvParams] = useState(null);
    const [error, setError] = useState(null);

    // Safely access metrics with fallback empty arrays
    const dailyMetrics = location.metrics?.['location_daily_metrics'] || [];
    const hourlyMetrics = location.metrics?.['location_hourly_metrics'] || [];
    transformMetrics(dailyMetrics);
    transformMetrics(hourlyMetrics);
    const metricsState = {
        dailyMetrics: dailyMetrics,
        hourlyMetrics: hourlyMetrics,
        dailyTimeFormat: getTimeFormat(pastMonth, today),
        hourlyTimeFormat: getTimeFormat(pastDay, today),
        latestMetric: hourlyMetrics[0] || {},
        totalExceedances: 0
    };

    // Fetch sensor-specific data on mount
    useEffect(() => {
        let isMounted = true;
        const deviceId = location.device_id || location.id;
        if (sensorType === 'MCU' && deviceId) {
            getMCUDeviceDetails(deviceId)
                .then(data => { if (isMounted) setMCUData(data); })
                .catch(e => { if (isMounted) setError(e.message); });
        }
        if (sensorType === 'AI' && deviceId) {
            getMCUDeviceDetails(deviceId)
                .then(data => { if (isMounted) setMCUData(data); })
                .catch(e => { if (isMounted) setError(e.message); });
            getAISoundInference(deviceId)
                .then(data => { if (isMounted) setAISoundInference(data); })
                .catch(e => { if (isMounted) setError(e.message); });
            getAIEnvironmentalParams(deviceId)
                .then(data => { if (isMounted) setAIEnvParams(data); })
                .catch(e => { if (isMounted) setError(e.message); });
        }
        return () => { isMounted = false; };
    }, [sensorType, location]);

    // Device health and battery level (example extraction)
    const deviceHealth = mcuData?.device_health || location.device_health || 'Unknown';
    const batteryLevel = mcuData?.battery_level || location.battery_level || 'Unknown';

    return (
        <AnalysisWrapper>
            <LocationNameText>{getLocationName(location)}</LocationNameText>
            <InfoCardContainer>
                <CardTitle>Location Information</CardTitle>
                <p className="p-2"><span className="font-bold">Area description</span>: {location.location_description}</p>
                <p className="p-2"><span className="font-bold">Daytime Limit</span>: {location.day_limit}dB</p>
                <p className="p-2"><span className="font-bold">Night-time Limit</span>: {location.night_limit}dB</p>
                <p className="p-2">The above limits are as recommended in the
                    <a className="text-blue-600"
                       href="http://nema.go.ug/sites/all/themes/nema/docs/noise_standards_and_control_regulations.pdf">
                        NEMA Noise Standards and Control Regulations
                    </a></p>
            </InfoCardContainer>
            <InfoCardContainer>
                <CardTitle>Device Health & Battery</CardTitle>
                <p className="p-2"><span className="font-bold">Device Health</span>: {deviceHealth}</p>
                <p className="p-2"><span className="font-bold">Battery Level</span>: {batteryLevel}</p>
            </InfoCardContainer>
            {/* Decibel Data (MCU and AI) */}
            <NoiseLevelCard value={Math.round(metricsState.latestMetric.hourly_avg_db_level)} title={"Last Hour Average"}/>
            <NoiseLevelCard value={Math.round(metricsState.latestMetric.hourly_max_db_level)} title={"Last Hour Maximum"}/>
            <NoiseLevelCard title={"Last Hour Median"} value={Math.round(metricsState.latestMetric.hourly_median_db_level)}/>
            <GenericNumberCard title={"Last Hour Exceedances"} value={metricsState.latestMetric.hourly_no_of_exceedances}/>
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
            <HourlyNoiseHeatMap data_with_meta={getHeatMapData(metricsState.hourlyMetrics)}/>
            {/* AI sensor-specific data */}
            {sensorType === 'AI' && (
                <>
                    <AISoundInferenceChart data={aiSoundInference}/>
                    <AIEnvironmentalParamsChart data={aiEnvParams}/>
                </>
            )}
            {/* Error handling */}
            {error && <div style={{color: 'red', marginTop: '1rem'}}>Error: {error}</div>}
        </AnalysisWrapper>
    );
};

export default Location;
