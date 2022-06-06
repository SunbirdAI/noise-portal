import {
    NoiseLevelCardContainer,
    LargeFigure,
    LocationDescription,
    CardTitle,
    NoiseColorBand,
    GenericNumberCardContainer
} from "./LocationCard.styles";
import {basicNoiseThresholds} from "../../utils";
import {getColorId} from "../NoiseLevelMarker";

const getNoiseLevelDescription = (noiseLevel) => {
    if (noiseLevel < basicNoiseThresholds.low) return "Quiet";
    if(noiseLevel < basicNoiseThresholds.high) return "Moderate";
    return "Noisy";
}
export const GenericNumberCard = ({title, value}) => (
    <GenericNumberCardContainer>
        <CardTitle>{title}</CardTitle>
        <LargeFigure>{value}</LargeFigure>
        {/*<div>Noise Level: {getNoiseLevelDescription(value)}</div>*/}
    </GenericNumberCardContainer>
);


const LocationCard = ({value, title}) => (
    <NoiseLevelCardContainer>
        <NoiseColorBand color_id={getColorId(value)}/>
        <LocationDescription>
            <CardTitle>{title}</CardTitle>
            <LargeFigure>{value}dB</LargeFigure>
            <h2>Noise Level: {getNoiseLevelDescription(value)}</h2>
        </LocationDescription>
    </NoiseLevelCardContainer>
);

export default LocationCard;
