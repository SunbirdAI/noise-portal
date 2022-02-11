import {ChartContainer, LineGraphContainer} from "./NoiseLevelChart.styles";
import {CardTitle} from "../NoiseLevelCard/LocationCard.styles";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine} from "recharts";

const noiseMetrics = [
    {
        'time': '0:00',
        'dbLevel': 80
    },
    {
        'time': '1:00',
        'dbLevel': 58
    },
    {
        'time': '2:00',
        'dbLevel': 72
    },
    {
        'time': '3:00',
        'dbLevel': 56
    },
    {
        'time': '4:00',
        'dbLevel': 43
    },
    {
        'time': '5:00',
        'dbLevel': 45
    },
    {
        'time': '6:00',
        'dbLevel': 80
    },
    {
        'time': '7:00',
        'dbLevel': 61
    },
    {
        'time': '8:00',
        'dbLevel': 88
    },
    {
        'time': '9:00',
        'dbLevel': 62
    },
    {
        'time': '10:00',
        'dbLevel': 86
    },
    {
        'time': '11:00',
        'dbLevel': 67
    }
];

const NoiseLevelChart = () => (
    <ChartContainer>
        <CardTitle>Noise Levels Overtime</CardTitle>
        <LineGraphContainer>
            <ResponsiveContainer width="95%" height="100%">
                <LineChart data={noiseMetrics}>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <ReferenceLine y={70} label="High noise" stroke="red"/>
                    <Line type="monotone" dataKey="dbLevel" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>
        </LineGraphContainer>
    </ChartContainer>
);

export default NoiseLevelChart;
