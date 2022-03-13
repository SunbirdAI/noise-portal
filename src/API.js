import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const LOCATIONS_URL = `${API_URL}/devices/locations`;

const getLocationMetricsURL = (locationId) => (`${API_URL}/devices/location_metrics/${locationId}`);

const fetchLocations = async () => {
    return await (await fetch(LOCATIONS_URL)).json();
}

const fetchLocationMetrics = async (locationId) => {
    const endpoint = getLocationMetricsURL(locationId);
    const metrics = await (await fetch(endpoint)).json();

    return metrics['location_metrics'];
}

export {
    LOCATIONS_URL,
    fetchLocations,
    fetchLocationMetrics,
    getLocationMetricsURL
}
