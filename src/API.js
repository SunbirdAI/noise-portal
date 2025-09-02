const API_URL = process.env.REACT_APP_API_URL || 'https://noise-sensors-dashboard.herokuapp.com';

// Check if API URL is available
if (!process.env.REACT_APP_API_URL) {
    console.warn('REACT_APP_API_URL environment variable not set, using default:', API_URL);
}

const LOCATIONS_URL = `${API_URL}/devices/locations/?page=1`;

const ANALYSIS_URL = `${API_URL}/analysis`;

const getLocationMetricsURL = (locationId) => (`${API_URL}/devices/location_metrics/${locationId}`);
// Endpoint builders for new sensor types
const getMCUSensorURL = (deviceName) => `${API_URL}/devices/devices/by-device-id/${deviceName}/`;
const getAISoundInferenceURL = (deviceName) => `${API_URL}/device_metrics/sound-inference-data/by-device-id/${deviceName}/`;
const getAIEnvironmentalParamsURL = (deviceName) => `${API_URL}/device_metrics/environmental-parameters/by-device-id/${deviceName}/`;

// Fetch device details for MCU sensors
export const getMCUDeviceDetails = async (deviceName) => {
    try {
        const response = await fetch(getMCUSensorURL(deviceName));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('[API] MCU Device Details:', data);
        return data;
    } catch (error) {
        console.error('Error fetching MCU device details:', error);
        throw error;
    }
};

// Fetch sound inference data for AI sensors
export const getAISoundInference = async (deviceName) => {
    try {
        const response = await fetch(getAISoundInferenceURL(deviceName));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('[API] AI Sound Inference:', data);
        return data;
    } catch (error) {
        console.error('Error fetching AI sound inference:', error);
        throw error;
    }
};

// Fetch environmental parameters for AI sensors
export const getAIEnvironmentalParams = async (deviceName) => {
    try {
        const response = await fetch(getAIEnvironmentalParamsURL(deviceName));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('[API] AI Environmental Params:', data);
        return data;
    } catch (error) {
        console.error('Error fetching AI environmental params:', error);
        throw error;
    }
};

const fetchHomePageData = async () => {
    try {
        const locationsResponse = await fetchLocations();
        // Handle the new API response format
        const locations = locationsResponse.results || locationsResponse;
        if (!Array.isArray(locations) || locations.length === 0) {
            throw new Error('No locations found in API response');
        }
        console.log('[API] Locations:', locations);
        // Transform the API data to match expected format
        const transformedLocations = locations.map((location, index) => ({
            id: location.id,
            latitude: location.latitude,   // Keep original field names
            longitude: location.longitude, // Keep original field names
            lat: location.latitude,        // Also provide lat/lng for backward compatibility
            lng: location.longitude,       // Also provide lat/lng for backward compatibility
            parish: location.parish,
            division: location.division,
            city: location.city,
            village: location.village,
            location_description: location.location_description,
            day_limit: location.day_limit,
            night_limit: location.night_limit,
            name: `${location.parish}, ${location.division}`,
            device_name: location.device_name ?? '',
            noise_level: location.noise_level ?? 0,
            metrics: location.metrics ?? {
                location_hourly_metrics: [],
                location_daily_metrics: []
            }
        }));
        console.log('Successfully fetched data from API:', transformedLocations.length, 'locations');
        console.log('First location sample:', transformedLocations[0]);
        return transformedLocations;
    } catch (error) {
        console.error('API request failed:', error.message);
        throw error;
    }
}

const safeJsonFetch = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Expected JSON but received: ${contentType}. Response: ${text.substring(0, 100)}...`);
        }
        const data = await response.json();
        console.log(`[API] Fetched from ${url}:`, data);
        return data;
    } catch (error) {
        console.error(`Failed to fetch from ${url}:`, error.message);
        throw error;
    }
};

const fetchLocations = async () => {
    return await safeJsonFetch(LOCATIONS_URL);
}

const fetchLocationMetrics = async (locationId) => {
    try {
        const endpoint = getLocationMetricsURL(locationId);
        const metrics = await safeJsonFetch(endpoint);
        return metrics['location_metrics'];
    } catch (error) {
        console.warn(`Failed to fetch metrics for location ${locationId}:`, error.message);
        // Return empty metrics if API fails
        return {
            location_hourly_metrics: []
        };
    }
}

const fetchAnalysis = async () => {
    try {
        return await safeJsonFetch(ANALYSIS_URL);
    } catch (error) {
        console.warn('Failed to fetch analysis data:', error.message);
        // Return empty analysis data if API fails
        return {
            daily_analysis: [],
            weekly_analysis: [],
            monthly_analysis: []
        };
    }
}

// Utility function to detect sensor type based on device name
export function detectSensorType(deviceName) {
    if (typeof deviceName !== 'string') return 'unknown';
    if (deviceName.startsWith('SB')) return 'MCU';
    if (deviceName.startsWith('SEAS')) return 'AI';
    return 'unknown';
}

export {
    LOCATIONS_URL,
    fetchLocations,
    fetchLocationMetrics,
    fetchAnalysis,
    getLocationMetricsURL,
    fetchHomePageData
}
