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
