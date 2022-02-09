import {renderToStaticMarkup} from "react-dom/server";
import {NoiseLevelMarkerContainer} from "./NoiseLevelMarker.styles";
import {MdVolumeUp, MdVolumeDown, MdVolumeMute} from "react-icons/md";
import {divIcon} from "leaflet/dist/leaflet-src.esm";
import {Marker, Popup} from "react-leaflet";


const thresholds = [35, 40, 45, 50, 55, 60, 65, 70, 75, 80];


const getImage = (noise_level) => {
    if (noise_level < 50) return (<MdVolumeMute/>)
    if (noise_level < 65) return (<MdVolumeDown/>)
    return (<MdVolumeUp/>)
};

const getColorId = (noise_level) => {
    for (let i = 0; i < thresholds.length; i++) {
        if(noise_level < thresholds[i]) return i;
    }
    return 10;
};

const getCustomIcon = (noise_level) => {
    const iconMarkup = renderToStaticMarkup(
        <NoiseLevelMarkerContainer color_id={getColorId(noise_level)}>
            <h2>{`${noise_level}dB`}</h2>
            {getImage(noise_level)}
        </NoiseLevelMarkerContainer>
    );

    return divIcon({
        html: iconMarkup,
    })
};

const NoiseLevelMarker = ({location}) => (
    <Marker position={location.coordinates} icon={getCustomIcon(location.noise_level)}>
        <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
        </Popup>
    </Marker>
);

export default NoiseLevelMarker;
