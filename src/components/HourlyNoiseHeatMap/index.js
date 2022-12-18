import {HeatMapGrid} from "react-grid-heatmap";
import {ChartContainer} from "../NoiseLevelChart/NoiseLevelChart.styles";
import {CardTitle} from "../NoiseLevelCard/LocationCard.styles";
import {Tooltip} from "@mui/material";


const xLabels = new Array(24).fill(0).map((_, i) => `${i}:00`);
const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// const data = new Array(yLabels.length)
//     .fill(0)
//     .map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 50 + 50)));

const HourlyNoiseHeatMap = ({data_with_meta}) => {
    return (
        <ChartContainer>
            <CardTitle>Heatmap of Hourly Average Noise levels for the past week</CardTitle>
            <HeatMapGrid
                data={data_with_meta.data}
                xLabels={xLabels}
                yLabels={yLabels}
                cellRender={(x, y, value) => (
                    <Tooltip title={data_with_meta.meta[x][y]} placement="top" arrow>
                        <div>{value}</div>
                    </Tooltip>
                )}
                cellHeight={'3rem'}
                square
            />
        </ChartContainer>
    );
}

export default HourlyNoiseHeatMap;
