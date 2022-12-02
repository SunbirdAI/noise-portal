import {ChartContainer} from "../NoiseCategoryChart/NoiseCategoryChart.styles";
import {CardTitle} from "../NoiseLevelCard/LocationCard.styles";
import {LineGraphContainer} from "../NoiseLevelChart/NoiseLevelChart.styles";
import {ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid} from "recharts";


const ExceedanceBarChart = ({title, day_time_exceedances, night_time_exceedances, analysis}) => (
	<ChartContainer className='w-full'>
		<CardTitle>{title}</CardTitle>
		<LineGraphContainer>
			<ResponsiveContainer width='95%' height='80%'>
				<BarChart
					data={analysis}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey='parish'/>
					<YAxis/>
					<Tooltip/>
					<Legend/>
					<Bar dataKey={day_time_exceedances} fill='#82a6ad'/>
					<Bar dataKey={night_time_exceedances} fill='#430a4a'/>
				</BarChart>
			</ResponsiveContainer>
		</LineGraphContainer>
	</ChartContainer>
);

export default ExceedanceBarChart;
