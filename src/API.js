import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const LOCATIONS_URL = `${API_URL}/devices/locations`;

const METRICS_URL = `${API_URL}/`

const getLocationMetricsURL = (locationId) => (`${API_URL}/device_metrics/device/${locationId}`);

const fetchLocations = async () => {
    return await (await fetch(LOCATIONS_URL)).json();
}

const fetchLocationMetrics = async (locationId) => {
    const endpoint = getLocationMetricsURL(locationId);

    return await (await fetch(endpoint)).json();
}

export {
    LOCATIONS_URL,
    fetchLocations,
    fetchLocationMetrics,
    getLocationMetricsURL
}
