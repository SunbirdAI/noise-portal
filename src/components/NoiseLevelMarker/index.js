import { renderToStaticMarkup } from "react-dom/server";
import {
    NoiseLevelMarkerContainer,
    LocationText,
    PopUpContainer
} from "./NoiseLevelMarker.styles";
import { basicNoiseThresholds } from "../../utils";
import { MdVolumeUp, MdVolumeDown, MdVolumeMute } from "react-icons/md";
import { divIcon } from "leaflet/dist/leaflet-src.esm";
import { Marker, Popup } from "react-leaflet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as API from "../../API";
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

const getCustomIcon = (noise_level) => {
    const iconMarkup = renderToStaticMarkup(
        <NoiseLevelMarkerContainer color_id={getColorId(noise_level)}>
            {getImage(noise_level)}
        </NoiseLevelMarkerContainer>
    );
    return divIcon({ html: iconMarkup });
};



const NoiseLevelMarker = ({ location }) => {
    const navigate = useNavigate();
    const [deviceDetails, setDeviceDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // Validate coordinates before rendering marker
    if (!location.latitude || !location.longitude || 
        isNaN(location.latitude) || isNaN(location.longitude)) {
        console.warn('Invalid coordinates for location:', location);
        return null;
    }

    const fetchDeviceDetails = async () => {
        if (deviceDetails) return; // Avoid re-fetching if already loaded
        setLoading(true);
        setError(null);
        try {
            // Use detectSensorType for robust detection
            const deviceName = location.device_name ?? location.name ?? "";
            const sensorType = API.detectSensorType(deviceName);
            if (sensorType === 'MCU') {
                const details = await API.getMCUDeviceDetails(deviceName);
                setDeviceDetails({ type: 'mcu', data: details });
            } else if (sensorType === 'AI') {
                const [inference, environment] = await Promise.all([
                    API.getAISoundInference(deviceName),
                    API.getAIEnvironmentalParams(deviceName)
                ]);
                setDeviceDetails({ type: 'ai', inference, environment });
            } else {
                setDeviceDetails({ type: 'unknown' });
            }
        } catch (err) {
            setError('Failed to fetch device details');
        } finally {
            setLoading(false);
        }
    };

    // const handleViewLocation = () => {
    //     navigate(`/location/${location.id}`, { state: { location } });
    // };

    // Show popup on hover
    const handleMouseOver = () => {
        setShowPopup(true);
        fetchDeviceDetails();
    };
    const handleMouseOut = () => {
        setShowPopup(false);
    };

    return (
        <Marker
            position={[location.latitude, location.longitude]}
            icon={getCustomIcon(location.noise_level)}
            eventHandlers={{
                mouseover: handleMouseOver,
                mouseout: handleMouseOut
            }}
        >
            {showPopup && (
                <Popup>
                    <PopUpContainer>
                        <LocationText>
                            <h3 style={{ margin: 0, fontWeight: 600 }}>{location.name}</h3>
                        </LocationText>
                        {loading && <p style={{ textAlign: 'center', margin: '8px 0' }}>Loading...</p>}
                        {error && <p style={{ color: 'red', textAlign: 'center', margin: '8px 0' }}>{error}</p>}
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
                    </PopUpContainer>
                </Popup>
            )}
        </Marker>
    );
};

export default NoiseLevelMarker;
