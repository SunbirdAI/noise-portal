import {MyMapContainer} from "./HomePageMap.styles";
// import {sampleLocations} from "../../utils";
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, useMap} from "react-leaflet";
import NoiseLevelMarker from "../NoiseLevelMarker";
import {useRef} from "react";

const SetViewOnCitySelect = ({newCenter, animateRef}) => {
    const map = useMap();
    
    // Validate coordinates before setting view
    if (newCenter && newCenter[0] !== undefined && newCenter[1] !== undefined) {
        map.setView(newCenter, 13, {
            animate: animateRef.current || false
        });
    }

    return null;
}

const HomePageMap = ({locations}) => {
    const animateRef = useRef(false);
    animateRef.current = !animateRef.current;
    
    // Filter out locations with invalid coordinates
    const validLocations = locations.filter(location => 
        location.latitude !== undefined && 
        location.longitude !== undefined &&
        !isNaN(location.latitude) &&
        !isNaN(location.longitude)
    );
    
    // Calculate center point - use first valid location or default to Kampala
    const centerPoint = validLocations.length > 0 
        ? [validLocations[0].latitude, validLocations[0].longitude]
        : [0.347596, 32.582520]; // Default to Kampala coordinates
    
    return (
        <MyMapContainer>
            <MapContainer center={[0.347596, 32.582520]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {validLocations.map((location, index) => (
                    <NoiseLevelMarker key={location.id || index} location={location}/>
                ))}
                <SetViewOnCitySelect
                    newCenter={centerPoint}
                    animateRef={animateRef}
                />
            </MapContainer>
        </MyMapContainer>
    );
};

export default HomePageMap;
