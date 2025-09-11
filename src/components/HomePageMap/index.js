import {MyMapContainer} from "./HomePageMap.styles";
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import {MapContainer, TileLayer, useMap} from "react-leaflet";
import NoiseLevelMarker from "../NoiseLevelMarker";
import {useRef} from "react";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from "leaflet";

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

// Enhanced custom cluster icon function
const createClusterIcon = (cluster) => {
    const count = cluster.getChildCount();
    
    // Determine cluster size and styling based on marker count
    let size, bgColor, textColor, fontSize, borderWidth;
    
    if (count < 10) {
        size = 45;
        bgColor = '#10b91e94'; // Green for small clusters
        textColor = '#ffffff';
        fontSize = 14;
        borderWidth = 3;
    } else if (count < 50) {
        size = 55;
        bgColor = '#f59f0b74'; // Amber for medium clusters
        textColor = '#ffffff';
        fontSize = 16;
        borderWidth = 4;
    } else {
        size = 65;
        bgColor = '#ef444470'; // Red for large clusters
        textColor = '#ffffff';
        fontSize = 18;
        borderWidth = 5;
    }
    
    return L.divIcon({
        html: `
            <div class="custom-cluster-container" style="
                width: ${size}px;
                height: ${size}px;
                position: relative;
                cursor: pointer;
            ">
                <div class="cluster-inner" style="
                    background: ${bgColor};
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: ${fontSize}px;
                    font-weight: 700;
                    color: ${textColor};
                    box-shadow: 
                        0 4px 12px rgba(0, 0, 0, 0.15),
                        0 2px 6px rgba(0, 0, 0, 0.1),
                        inset 0 1px 2px rgba(255, 255, 255, 0.2);
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: scale(1);
                    position: relative;
                    overflow: hidden;
                ">
                    <span style="
                        position: relative;
                        z-index: 2;
                        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                    ">${count}</span>
                    
                    <!-- Pulse animation ring -->
                    <div style="
                        position: absolute;
                        top: -${borderWidth}px;
                        left: -${borderWidth}px;
                        right: -${borderWidth}px;
                        bottom: -${borderWidth}px;
                        border: 2px solid ${bgColor};
                        border-radius: 50%;
                        opacity: 0.6;
                        animation: cluster-pulse 2s infinite ease-out;
                    "></div>
                    
                    <!-- Shine effect -->
                    <div style="
                        position: absolute;
                        top: 15%;
                        left: 20%;
                        width: 30%;
                        height: 30%;
                        background: radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%);
                        border-radius: 50%;
                        z-index: 1;
                    "></div>
                </div>
            </div>
        `,
        className: "enhanced-cluster-icon",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
    });
};

// Custom CSS styles for enhanced clusters
const clusterStyles = `
<style>
    /* Enhanced cluster animations and effects */
    .enhanced-cluster-icon {
        background: transparent !important;
        border: none !important;
    }
    
    .enhanced-cluster-icon:hover .cluster-inner {
        transform: scale(1.1);
        box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.2),
            0 4px 12px rgba(0, 0, 0, 0.15),
            inset 0 1px 2px rgba(255, 255, 255, 0.3);
    }
    
    /* Pulse animation */
    @keyframes cluster-pulse {
        0% {
            transform: scale(1);
            opacity: 0.6;
        }
        50% {
            transform: scale(1.2);
            opacity: 0.3;
        }
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }
    
    /* Click animation */
    .enhanced-cluster-icon:active .cluster-inner {
        transform: scale(0.95);
        transition: transform 0.1s ease-in-out;
    }
    
    /* Spiderfy line customization */
    .leaflet-cluster-anim .leaflet-marker-icon {
        transition: all 0.3s ease-out;
    }
    
    .marker-cluster-spiderfy-line {
        stroke: #64748b;
        stroke-width: 2;
        stroke-opacity: 0.6;
    }
    
    /* Custom coverage area styling */
    .marker-cluster-coverage {
        stroke: #3b82f6;
        stroke-width: 2;
        stroke-opacity: 0.4;
        fill: #3b82f6;
        fill-opacity: 0.1;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .enhanced-cluster-icon .cluster-inner {
            font-size: 12px !important;
        }
    }
</style>
`;

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
        <>
            {/* Inject custom styles */}
            <div dangerouslySetInnerHTML={{ __html: clusterStyles }} />
            
            <MyMapContainer>
                <MapContainer 
                    center={[0.347596, 32.582520]} 
                    zoom={13} 
                    scrollWheelZoom={true}
                    zoomControl={true}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    <MarkerClusterGroup
                        // Clustering behavior
                        maxClusterRadius={70}
                        disableClusteringAtZoom={16}
                        spiderfyOnMaxZoom={true}
                        showCoverageOnHover={true}
                        zoomToBoundsOnClick={true}
                        
                        // Animation settings
                        spiderfyDistanceMultiplier={2}
                        animate={true}
                        animateAddingMarkers={true}
                        
                        // Custom icon function
                        iconCreateFunction={createClusterIcon}
                        
                        // Spiderfy settings for better UX
                        spiderfyShapePositions={(count, centerPt) => {
                            const positions = [];
                            const distanceFromCenter = 30;
                            const angleStep = (2 * Math.PI) / count;
                            
                            for (let i = 0; i < count; i++) {
                                const angle = i * angleStep;
                                positions.push([
                                    centerPt.x + distanceFromCenter * Math.cos(angle),
                                    centerPt.y + distanceFromCenter * Math.sin(angle)
                                ]);
                            }
                            return positions;
                        }}
                        
                        // Event handlers
                        onClusterClick={(cluster) => {
                            // Optional: Add custom cluster click behavior
                            console.log('Cluster clicked:', cluster.getChildCount(), 'markers');
                        }}
                        
                        onSpiderfied={(cluster) => {
                            // Optional: Add behavior when cluster spiderfies
                            console.log('Cluster spiderfied');
                        }}
                        
                        onUnspiderfied={(cluster) => {
                            // Optional: Add behavior when cluster unspiderfies
                            console.log('Cluster unspiderfied');
                        }}
                    >
                        {validLocations.map((location, index) => (
                            <NoiseLevelMarker 
                                key={location.id || index} 
                                location={location}
                            />
                        ))}
                    </MarkerClusterGroup>
                    
                    <SetViewOnCitySelect
                        newCenter={centerPoint}
                        animateRef={animateRef}
                    />
                </MapContainer>
            </MyMapContainer>
        </>
    );
};

export default HomePageMap;