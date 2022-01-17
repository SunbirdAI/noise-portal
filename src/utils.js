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