import {ChartContainer} from "../NoiseCategoryChart/NoiseCategoryChart.styles";
import {CardTitle} from "../NoiseLevelCard/LocationCard.styles";
import {LineGraphContainer} from "../NoiseLevelChart/NoiseLevelChart.styles";
import {ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar} from "recharts";

const data = [
   {
	"city": "Kampala",
	"division": "Makindye",
	"average_noise": 65,
	"total_exceedances": 900
   },
   {
	"city": "Kampala",
	"division": "Central",
	"average_noise": 78,
	"total_exceedances": 650
   },
   {
	"city": "Kampala",
	"division": "Nakawa",
	"average_noise": 56,
	"total_exceedances": 100
   },
   {
	"city": "Kampala",
	"division": "Kawempe",
	"average_noise": 45,
	"total_exceedances": 500
   },
   {
	"city": "Kampala",
	"division": "Rubaga",
	"average_noise": 80,
	"total_exceedances": 432
   }
];

const AnalysisBarChart = ({title, metric, analysis}) => (
	<ChartContainer className='w-full'>
		<CardTitle>{title}</CardTitle>
		<LineGraphContainer>
			<ResponsiveContainer width='95%' height='80%'>
				<BarChart
					data={data}
				>
					<XAxis dataKey='division'/>
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
