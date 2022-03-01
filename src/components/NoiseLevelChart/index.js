import {ChartContainer, LineGraphContainer} from "./NoiseLevelChart.styles";
import {CardTitle} from "../NoiseLevelCard/LocationCard.styles";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine} from "recharts";
import {timeFormat} from 'd3-time-format';

const format = timeFormat("%I:%M %p");
const dayFormat = timeFormat("%a %d %b");
const formatDate = (dateString) =>  {
    const date = new Date(dateString);
    return format(date);
}


const NoiseLevelChart = ({metrics}) => (
    <ChartContainer>
        <CardTitle>Noise Levels Overtime</CardTitle>
        <LineGraphContainer>
            <ResponsiveContainer width="95%" height="100%">
                <LineChart data={metrics}>
                    <XAxis type="number" domain={['dataMin', 'dataMax']} dataKey="time_uploaded" tickFormatter={dayFormat}/>
                    {/*<XAxis angle={315} dy={10} ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}/>*/}
                    <YAxis/>
                    <ReferenceLine y={70} label="High noise" stroke="red"/>
                    <Line type="monotone" dataKey="db_level" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>
        </LineGraphContainer>
    </ChartContainer>
);

export default NoiseLevelChart;
