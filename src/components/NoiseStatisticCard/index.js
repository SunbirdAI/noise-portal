import {CardTitle, LargeFigure, GenericNumberCardContainer} from "../NoiseLevelCard/LocationCard.styles";
import {ColorDiv, NoiseMultiColorBand} from "./NoiseStatisticCard.styles";

const noiseRanges = [...Array(11).keys()].map((color_id, index) => (
    <ColorDiv key={index} color_id={color_id}/>
));

const getNoiseRangeColors = (noise_range) => {
    if(noise_range === 0) return noiseRanges.slice(0, 5);
    else if (noise_range === 1) return noiseRanges.slice(5, 8);
    else return noiseRanges.slice(8, 11);
};

const NoiseStatisticCard = ({title, noise_range, value}) => (
    <GenericNumberCardContainer>
        <NoiseMultiColorBand>
            {getNoiseRangeColors(noise_range)}
        </NoiseMultiColorBand>
        <CardTitle>{title}</CardTitle>
        <LargeFigure>{value}</LargeFigure>
    </GenericNumberCardContainer>
);

export default NoiseStatisticCard;
