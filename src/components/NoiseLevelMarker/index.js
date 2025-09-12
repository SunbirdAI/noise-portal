import { renderToStaticMarkup } from "react-dom/server";
import {
    NoiseLevelMarkerContainer,
    LocationText
} from "./NoiseLevelMarker.styles";
import { basicNoiseThresholds } from "../../utils";
import { MdVolumeUp, MdVolumeDown, MdVolumeMute } from "react-icons/md";
import { divIcon } from "leaflet/dist/leaflet-src.esm";
import { Marker, Popup } from "react-leaflet";
import { useState } from "react";
import MCUPopupContent from "./MCUPopupContent";
import AIPopupContent from "./AIPopupContent";

const thresholds = [35, 40, 45, 50, 55, 60, 65, 70, 75, 80];

const getImage = (noise_level) => {
    if (noise_level < basicNoiseThresholds.low) return (<MdVolumeMute/>);
    if (noise_level < basicNoiseThresholds.high) return (<MdVolumeDown/>);
    return (<MdVolumeUp/>);
};

export const getColorId = (noise_level) => {
    for (let i = 0; i < thresholds.length; i++) {
        if (noise_level < thresholds[i]) return i;
    }
    return 10;
};

const getCustomIcon = (noise_level, avgDbLevel = null) => {
    // Use avgDbLevel if provided (for MCU), otherwise use noise_level
    const valueForColor = avgDbLevel !== null ? avgDbLevel : noise_level;
    const iconMarkup = renderToStaticMarkup(
        <NoiseLevelMarkerContainer color_id={getColorId(valueForColor)}>
            <p>{`${Math.round(valueForColor)}dB`}</p>
            {getImage(valueForColor)}
        </NoiseLevelMarkerContainer>
    );
    return divIcon({ html: iconMarkup });
};



const NoiseLevelMarker = ({ location, deviceDetails }) => {
    const [showPopup, setShowPopup] = useState(false);

    // Validate coordinates before rendering marker
    if (!location.latitude || !location.longitude || 
        isNaN(location.latitude) || isNaN(location.longitude)) {
        console.warn('Invalid coordinates for location:', location);
        return null;
    }

    // Show popup on hover
    const handleMouseOver = () => setShowPopup(true);

    return (
        <Marker
            key={
                deviceDetails && deviceDetails.type === 'mcu'
                    ? `mcu-${location.id}-${deviceDetails.avgDbLevel}`
                    : `other-${location.id}-${location.noise_level}`
            }
            position={[location.latitude, location.longitude]}
            icon={
                deviceDetails && deviceDetails.type === 'mcu'
                    ? getCustomIcon(location.noise_level, deviceDetails.avgDbLevel)
                    : getCustomIcon(location.noise_level)
            }
            eventHandlers={{
                mouseover: handleMouseOver
            }}
        >
            {showPopup && (
                <Popup>
                    <div>
                        <LocationText>
                            <h3 style={{ margin: 0, fontWeight: 600 }}>{location.name}</h3>
                        </LocationText>
                        <div style={{ width: '100%' }}>
                        {deviceDetails && (
                            <>
                                {deviceDetails.type === 'mcu' && (
                                    <MCUPopupContent data={deviceDetails.data} location={location} />
                                )}
                                {deviceDetails.type === 'ai' && (
                                    <AIPopupContent
                                        inference={deviceDetails.inference}
                                        environment={deviceDetails.environment}
                                        location={location}
                                    />
                                )}
                                {deviceDetails.type === 'unknown' && (
                                    <div style={{ textAlign: 'center', margin: '8px 0' }}>
                                        <p style={{ margin: '4px 0' }}><strong>Device Type:</strong> Unknown</p>
                                        <p style={{ margin: '4px 0' }}><strong>Location:</strong> {location.name}</p>
                                        <p style={{ margin: '4px 0' }}><strong>Noise Level:</strong> {location.noise_level ?? 'N/A'} dB</p>
                                    </div>
                                )}
                            </>
                        )}
                        </div>
                    </div>
                </Popup>
            )}
        </Marker>
    );
};

export default NoiseLevelMarker;
