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

const getCustomIcon = (location, deviceDetails = null) => {
    let dbValue = location.noise_level; // fallback
    
    // For MCU devices, use average dB level
    if (deviceDetails?.type === 'mcu' && deviceDetails.avgDbLevel !== null) {
        dbValue = deviceDetails.avgDbLevel;
    }
    
    // For AI devices, use Sound Pressure (db_level from environment)
    if (deviceDetails?.type === 'ai' && deviceDetails.environment?.db_level !== null) {
        dbValue = deviceDetails.environment.db_level;
    }
    
    const iconMarkup = renderToStaticMarkup(
        <NoiseLevelMarkerContainer color_id={getColorId(dbValue)}>
            <p>{`${Math.round(dbValue)}dB`}</p>
            {getImage(dbValue)}
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

    // Generate unique key for re-rendering
    const getMarkerKey = () => {
        if (deviceDetails?.type === 'mcu') {
            return `mcu-${location.id}-${deviceDetails.avgDbLevel}`;
        }
        if (deviceDetails?.type === 'ai') {
            return `ai-${location.id}-${deviceDetails.environment?.db_level}`;
        }
        return `default-${location.id}-${location.noise_level}`;
    };

    return (
        <Marker
            key={getMarkerKey()}
            position={[location.latitude, location.longitude]}
            icon={getCustomIcon(location, deviceDetails)}
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
