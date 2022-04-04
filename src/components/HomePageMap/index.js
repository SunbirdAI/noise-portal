import {MyMapContainer} from "./HomePageMap.styles";
import {sampleLocations} from "../../utils";
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, useMap} from "react-leaflet";
import NoiseLevelMarker from "../NoiseLevelMarker";
import {useRef} from "react";

const SetViewOnCitySelect = ({newCenter, animateRef}) => {
    const map = useMap();
    map.setView(newCenter, 13, {
        animate: animateRef.current || false
    });

    return null;
}
const HomePageMap = ({locations}) => {
    const animateRef = useRef(false);
    animateRef.current = !animateRef.current;
    return (
        <MyMapContainer>
            <MapContainer center={[0.347596, 32.582520]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location, index) => (
                    <NoiseLevelMarker key={index} location={location}/>
                ))}
                <SetViewOnCitySelect
                    newCenter={locations.length === 0 ? [0.347596, 32.582520] : [locations[0].latitude, locations[0].longitude]}
                    animateRef={animateRef}
                />
            </MapContainer>
        </MyMapContainer>
    );
};

export default HomePageMap;
