import noiseData from './data/noise_data.json';


const categoryNames = {
    '1': "car-or-truck",
    '2': "motor-vehicle-horn",
    '3': "bodaboda-motorcycle",
    '4': "motor-vehicle-siren",
    '5': "car-alarm",
    '6': "mobile-music",
    '7': "hawker-vendor",
    '8': "community-radio",
    '9': "religious-venue",
    '10': "herbalists",
    '11': "construction-site",
    '12': "fabrication-workshop",
    '13': "generators",
    '14': "bar/restaurant/night-club",
    '15': "animal",
    '16': "crowd-noise",
    '17': "schools",
    '18': "street-preachers",
    '19': "other"
};

const categories = [...new Set(noiseData.map((dataPoint) =>
    dataPoint['Noise-Noise_Source']
))].filter((cat) => !isNaN(parseInt(cat)));

categories.sort((cat1, cat2) => parseInt(cat1) - parseInt(cat2));

// Format date as '14th July 2025: 4:54 pm'
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const suffix = getNumberSuffix(day);
    return `${day}${suffix} ${month} ${year}: ${formattedHours}:${formattedMinutes} ${ampm}`;
};

const getNumberSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

export const options = categories.map((cat, index) => ({
    categoryName: cat,
    id: index,
    label: categoryNames[cat],
    value: cat
}));

export const initialDataPoints = noiseData.map((dataPoint) => (
    {
        id: dataPoint['KEY'],
        category: dataPoint['Noise-Noise_Source'],
        categoryName: categoryNames[dataPoint['Noise-Noise_Source']],
        coordinates: [dataPoint.lat, dataPoint.lng],
        measurement: dataPoint['Noise-Noise_Measurement'],
        location_accuracy: dataPoint['Noise-Location-Accuracy']
    }
));

const randomPlaceNames = ["Mpererwe", "Wandegeya", "Lugogo", "Entebbe", "Kololo", "Kamwokya", "Bukoto", "Najjera"];
const randomIndices = [1815, 812, 1350, 596, 2266, 714, 4592, 2480, 2098, 1194, 4990, 140, 1235, 2595, 2505, 128, 2528, 3093, 2796, 3204];

export const sampleLocations = randomIndices.map((idx) => noiseData[idx]).map((dataPoint, index) => (
    {
        id: dataPoint['KEY'],
        coordinates: [dataPoint.lat, dataPoint.lng],
        name: randomPlaceNames[index % randomPlaceNames.length],
        noise_level: index % 5 === 0 ? '80': dataPoint['Noise-Noise_Measurement']
    }
));

export const basicNoiseThresholds = {
    "low": 55,
    "high": 70
};

const toFiniteNumber = (value) => {
    if (value === null || value === undefined || value === '') return null;

    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
};

const hasUsableCoordinates = (latitude, longitude) => {
    if (latitude === null || longitude === null) return false;
    if (latitude < -90 || latitude > 90) return false;
    if (longitude < -180 || longitude > 180) return false;

    // Ignore placeholder GPS values that put the sensor in the Gulf of Guinea.
    if (latitude === 0 && longitude === 0) return false;

    return true;
};

export const getLocationCoordinates = (location, deviceDetails = null) => {
    const mobileMetrics = deviceDetails?.type === 'mobile' ? deviceDetails.data?.get_metrics ?? [] : [];
    const latestValidMobileMetric = mobileMetrics.find((metric) => (
        hasUsableCoordinates(
            toFiniteNumber(metric?.last_rec),
            toFiniteNumber(metric?.last_upl)
        )
    ));

    const mobileLatitude = toFiniteNumber(latestValidMobileMetric?.last_rec);
    const mobileLongitude = toFiniteNumber(latestValidMobileMetric?.last_upl);
    const staticLatitude = toFiniteNumber(location?.latitude ?? location?.lat);
    const staticLongitude = toFiniteNumber(location?.longitude ?? location?.lng);

    const latitude = hasUsableCoordinates(mobileLatitude, mobileLongitude) ? mobileLatitude : staticLatitude;
    const longitude = hasUsableCoordinates(mobileLatitude, mobileLongitude) ? mobileLongitude : staticLongitude;

    if (!hasUsableCoordinates(latitude, longitude)) return null;

    return { latitude, longitude };
};
