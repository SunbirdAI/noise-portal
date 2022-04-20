import {ChartContainer} from "../NoiseCategoryChart/NoiseCategoryChart.styles";
import {CardTitle} from "../NoiseLevelCard/LocationCard.styles";
import {LineGraphContainer} from "../NoiseLevelChart/NoiseLevelChart.styles";
import {ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar} from "recharts";


const AnalysisBarChart = ({title, metric_1, metric_2, metric_3, metric_4, analysis}) => (
	<ChartContainer className='w-full'>
		<CardTitle>{title}</CardTitle>
		<LineGraphContainer>
			<ResponsiveContainer width='95%' height='80%'>
				<BarChart
					data={analysis}
				>
					<XAxis dataKey='parish'/>
					<YAxis/>
					<Tooltip/>
					<Legend/>
					<Bar dataKey={metric_1} fill='#b8d6d1'/>
					<Bar dataKey={metric_2} fill='#82a6ad'/>
					<Bar dataKey={metric_3} fill='#75085c'/>
					<Bar dataKey={metric_4} fill='#430a4a'/>
				</BarChart>
			</ResponsiveContainer>
		</LineGraphContainer>
	</ChartContainer>
);

export default AnalysisBarChart;
