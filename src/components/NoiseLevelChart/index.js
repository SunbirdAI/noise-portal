import {ChartContainer, LineGraphContainer} from "./NoiseLevelChart.styles";
import {CardTitle} from "../NoiseLevelCard/LocationCard.styles";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, Legend} from "recharts";
import {timeFormat} from "d3-time-format";

const fullDateFormat = timeFormat("%a %d %b %Y %I:%M %p");

// const formatDate = (dateString) =>  {
//     const date = new Date(dateString);
//     return hourFormat(date);
// }


const NoiseLevelChart = ({title, metrics, lines, timeFormat, dayLimit, nightLimit}) => (
    <ChartContainer>
        <CardTitle>{title}</CardTitle>
        <LineGraphContainer>
            <ResponsiveContainer width="95%" height="100%">
                <LineChart data={metrics}>
                    <XAxis type="number" domain={['dataMin', 'dataMax']} dataKey="date" tickFormatter={timeFormat}/>
                    {/*<XAxis angle={315} dy={10} ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}/>*/}
                    <YAxis/>
                    <ReferenceLine y={dayLimit} label={`High Daytime noise (${dayLimit}dB)`} stroke="red"/>
                    <ReferenceLine y={nightLimit} label={`High Night-time noise (${nightLimit}dB)`} stroke="purple"/>
                    <Tooltip labelFormatter={fullDateFormat}/>
                    <Line type="monotone" dataKey={lines[0]} stroke="#8884d8"/>
                    <Line type="monotone" dataKey={lines[1]} stroke="#aaa555"/>
                    <Line type="monotone" dataKey={lines[2]} stroke="#bb6792"/>
                    <Legend/>
                </LineChart>
            </ResponsiveContainer>
        </LineGraphContainer>
    </ChartContainer>
);

export default NoiseLevelChart;
