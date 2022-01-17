import React, {useState} from "react";

// Data
import {initialDataPoints, options} from "../../utils";

// Leaflet
import {Marker, Popup, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster/src/react-leaflet-markercluster";
import L from 'leaflet';

// Styles
import {Container, MyMap} from "./Map.styles";
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import CategorySelect from "../CategorySelect";
import NoiseRange from "../NoiseRange";

L.Icon.Default.imagePath = 'leafletimages/';


const initialState = {
    selectedItems: [],
    noiseDataPoints: initialDataPoints,
    values: [50]
};

const defaultPosition = [0.347596, 32.582520]; // Map will be centred at Kampala

const Map = () => {
    const [state, setState] = useState(initialState);

    const updateStateByCategory = (selectedList) => {
        if (selectedList.length !== 0) {
            const selectedItemsSet = new Set(selectedList.map((item) => item.categoryName));
            setState({
                    selectedItems: selectedList,
                    noiseDataPoints: initialState.noiseDataPoints.filter((dataPoint) =>
                        selectedItemsSet.has(dataPoint.category))
                }
            );
        } else setState({
            selectedItems: [],
            noiseDataPoints: initialState.noiseDataPoints
        });
    };

    const updateStateByNoiseMeasure = (noiseRange) => {
        const lower = noiseRange[0];
        const upper = noiseRange[1];
        setState({
            ...state,
            noiseDataPoints: initialState.noiseDataPoints.filter((dataPoint) =>
                dataPoint.measurement >= lower && dataPoint.measurement <= upper)
        });
    }

    const markers = state.noiseDataPoints.map((dataPoint, index) =>
        <Marker key={index} position={dataPoint.coordinates}>
            <Popup>
                <div>
                    Noise Category: {dataPoint.categoryName}
                    <br/>
                    Noise Measurement: {dataPoint.measurement}
                    <br/>
                    Location Accuracy: {dataPoint.location_accuracy}
                </div>
            </Popup>
        </Marker>
    );

    return (
        <Container>
            <CategorySelect
                options={options}
                updateSelected={updateStateByCategory}
            />
            <NoiseRange
                updateSelected={updateStateByNoiseMeasure}
            />
            <MyMap
                preferCanvas={true}
                center={defaultPosition}
                zoom={10}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup zoomToBoundsOnClick={true}>
                    {markers}
                </MarkerClusterGroup>
            </MyMap>
        </Container>
    );
};

export default Map;
