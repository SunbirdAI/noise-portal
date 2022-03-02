import {
    NoiseLevelCardContainer,
    LargeFigure,
    LocationDescription,
    CardTitle,
    NoiseColorBand,
    GenericNumberCardContainer
} from "./LocationCard.styles";
import {getColorId} from "../NoiseLevelMarker";


export const GenericNumberCard = ({title, value}) => (
    <GenericNumberCardContainer>
        <CardTitle>{title}</CardTitle>
        <LargeFigure>{value}</LargeFigure>
        <div>Noise Level: Quiet</div>
    </GenericNumberCardContainer>
);


const LocationCard = ({value, title}) => (
    <NoiseLevelCardContainer>
        <NoiseColorBand color_id={getColorId(value)}/>
        <LocationDescription>
            <CardTitle>{title}</CardTitle>
            <LargeFigure>{value}dB</LargeFigure>
            <h2>Noise Level: Moderate</h2>
        </LocationDescription>
    </NoiseLevelCardContainer>
);

export default LocationCard;
