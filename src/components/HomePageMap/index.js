import {MyMapContainer} from "./HomePageMap.styles";
import {sampleLocations} from "../../utils";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import NoiseLevelMarker from "../NoiseLevelMarker";



const HomePageMap = () => (
    <MyMapContainer>
        <MapContainer center={[0.347596, 32.582520]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {sampleLocations.map((location, index) => (
                <NoiseLevelMarker key={index} location={location}/>
            ))}
        </MapContainer>
    </MyMapContainer>
);

export default HomePageMap;
