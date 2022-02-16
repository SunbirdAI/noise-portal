import {ChartContainer} from "./NoiseCategoryChart.styles";
import {CardTitle} from "../NoiseLevelCard/LocationCard.styles";
import {LineGraphContainer} from "../NoiseLevelChart/NoiseLevelChart.styles";
import {PieChart, Pie, ResponsiveContainer, Cell} from "recharts";

const data = [
    {name: 'Group A', value: 400, category: 'Schools', color: '#0088FE'},
    {name: 'Group B', value: 300, category: 'Churches', color: '#00C49F'},
    {name: 'Group C', value: 300, category: 'Other', color: '#FFBB28'},
    {name: 'Group D', value: 200, category: 'Siren', color: '#FF8042'},
];

const renderLabel = (dataPoint) => (`${dataPoint.category} (${dataPoint.value})`);

const NoiseCategoryChart = () => (
    <ChartContainer>
        <CardTitle>Noise Categories</CardTitle>
        <LineGraphContainer>
            <ResponsiveContainer width='95%' height='80%'>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey='value'
                        cx='50%'
                        cy='50%'
                        innerRadius='40%'
                        outerRadius='60%'
                        label={renderLabel}>
                        {data.map((dataPoint, index) => (
                            <Cell key={`cell-${index}`} fill={dataPoint.color}/>
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </LineGraphContainer>
    </ChartContainer>
);

export default NoiseCategoryChart;
