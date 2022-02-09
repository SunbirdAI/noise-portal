import {
    Wrapper,
    InfoContainer,
    FilterContainer,
    MyMapContainer
} from "./Intro.styles";
import Select from "react-select";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";


L.Icon.Default.imagePath = 'leafletimages/';

const options = [
    {value: 'Entebbe', label: 'Entebbe'},
    {value: 'Kampala', label: 'Kampala'},
    {value: 'Uganda', label: 'Uganda'}
]

const Intro = () => (
    <Wrapper>
        <InfoContainer>
            <p>Welcome to the Sunbird AI Noise Dashboard.Track noise levels across Kampala and Entebbe.</p>
        </InfoContainer>
        <FilterContainer>
            <Select
                className="my-8 w-3/4 z-50"
                options={options}
            />
        </FilterContainer>
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
    </Wrapper>
);

export default Intro;
