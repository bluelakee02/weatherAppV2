exports.getFileExtension = (s) => s.match(/\.[0-9a-z]+$/i)[0];

exports.setProperContentType = (res, fileExtension) => {
    switch (fileExtension) {
    case '.js':
        res.type('.js');
        break;
    case '.html':
        res.type('.html')
        break;
    case '.css':
        res.type('.css')
        break;
    case '.ttf':
        res.type('.ttf')
        break;
    case '.webp':
        res.type('.webp')
        break;
    }
}

const months = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const mphToKph = (n) => n * 1.609344;

exports.parseWeatherData = (data) => data.map(day => ({
    maxTemp: day.max_temp?.toFixed(1),
    minTemp: day.min_temp?.toFixed(1),
    weatherState: day.weather_state_name,
    humidity: day.humidity,
    windSpeed: mphToKph(day.wind_speed).toFixed(2),
    date: new Date(day.applicable_date).getDate(),
    day: days[new Date(day.applicable_date).getDay()],
    month: months[new Date(day.applicable_date).getMonth()],
    iconUrl: `https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`,
}))
