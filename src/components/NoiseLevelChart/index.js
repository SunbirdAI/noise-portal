import {ChartContainer, LineGraphContainer} from "./NoiseLevelChart.styles";
import {CardTitle} from "../NoiseLevelCard/LocationCard.styles";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip} from "recharts";
import {timeFormat} from "d3-time-format";

const fullDateFormat = timeFormat("%a %d %b %Y %I:%M %p");

// const formatDate = (dateString) =>  {
//     const date = new Date(dateString);
//     return hourFormat(date);
// }


const NoiseLevelChart = ({metrics, timeFormat}) => (
    <ChartContainer>
        <CardTitle>Noise Levels Overtime (30 minute average)</CardTitle>
        <LineGraphContainer>
            <ResponsiveContainer width="95%" height="100%">
                <LineChart data={metrics}>
                    <XAxis type="number" domain={['dataMin', 'dataMax']} dataKey="time_uploaded" tickFormatter={timeFormat}/>
                    {/*<XAxis angle={315} dy={10} ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}/>*/}
                    <YAxis/>
                    <ReferenceLine y={70} label="High noise" stroke="red"/>
                    <Tooltip labelFormatter={fullDateFormat}/>
                    <Line type="monotone" dataKey="avg_db_level" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>
        </LineGraphContainer>
    </ChartContainer>
);

export default NoiseLevelChart;
