import {
    NoiseLevelCardContainer,
    DBLevel,
    LocationDescription,
    CardTitle,
    NoiseColorBand,
    GenericNumberCardContainer
} from "./LocationCard.styles";
import {getColorId} from "../NoiseLevelMarker";


export const GenericNumberCard = ({title, value}) => (
    <GenericNumberCardContainer>
        <CardTitle>{title}</CardTitle>
        <DBLevel>{value}</DBLevel>
        <div>Noise Level: Quiet</div>
    </GenericNumberCardContainer>
);


const LocationCard = ({location, title}) => (
    <NoiseLevelCardContainer>
        <NoiseColorBand color_id={getColorId(location.noise_level)}/>
        <LocationDescription>
            <CardTitle>{title}</CardTitle>
            <DBLevel>{location.noise_level}dB</DBLevel>
            <h2>Noise Level: Moderate</h2>
        </LocationDescription>
    </NoiseLevelCardContainer>
);

export default LocationCard;
