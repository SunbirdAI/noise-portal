import {MyMapContainer} from "./HomePageMap.styles";
import L from "leaflet";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

L.Icon.Default.imagePath = 'leafletimages';

const HomePageMap = () => (
    <MyMapContainer>
        <MapContainer center={[0.347596, 32.582520]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[0.347596, 32.582520]}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
            <Marker position={[0.326596, 32.582520]}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
            <Marker position={[0.327596, 32.552520]}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    </MyMapContainer>
);

export default HomePageMap;
