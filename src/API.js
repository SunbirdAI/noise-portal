const API_URL = process.env.REACT_APP_API_URL;

const LOCATIONS_URL = `${API_URL}/devices/locations`;

const LOCATION_METRICS_URL = `${API_URL}/devices/location_metrics`

const ANALYSIS_URL = `${API_URL}/analysis`;

const getLocationMetricsURL = (locationId) => (`${API_URL}/devices/location_metrics/${locationId}`);

const fetchHomePageData = async () => {
    const locations = await fetchLocations();
    const metrics = await fetchAllLocationMetrics();
    const validLocations = [];
    for (let i = 0; i < locations.length; i++) {
        locations[i]["metrics"] = metrics[i];
        if(metrics[i]["location_hourly_metrics"].length !== 0)
            validLocations.push(locations[i]);
    }

    console.log(validLocations)
    return validLocations;
}

const fetchAllLocationMetrics = async () => {
    return await (await fetch(LOCATION_METRICS_URL)).json();
}

const fetchLocations = async () => {
    return await (await fetch(LOCATIONS_URL)).json();
}

const fetchLocationMetrics = async (locationId) => {
    const endpoint = getLocationMetricsURL(locationId);
    const metrics = await (await fetch(endpoint)).json();

    return metrics['location_metrics'];
}

const fetchAnalysis = async () => {
    return await (await fetch(ANALYSIS_URL)).json();
}

export {
    LOCATIONS_URL,
    fetchLocations,
    fetchLocationMetrics,
    fetchAnalysis,
    getLocationMetricsURL,
    fetchHomePageData
}
