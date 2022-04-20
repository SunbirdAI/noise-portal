import {ChartContainer} from "../NoiseCategoryChart/NoiseCategoryChart.styles";
import {CardTitle} from "../NoiseLevelCard/LocationCard.styles";
import {LineGraphContainer} from "../NoiseLevelChart/NoiseLevelChart.styles";
import {ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar} from "recharts";


const AnalysisBarChart = ({title, metric, analysis}) => (
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
					<Bar dataKey={metric} fill='#8884d8'/>
				</BarChart>
			</ResponsiveContainer>
		</LineGraphContainer>
	</ChartContainer>
);

export default AnalysisBarChart;
