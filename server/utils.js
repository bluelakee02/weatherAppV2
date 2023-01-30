exports.getFileExtension = s => s.match(/\.[0-9a-z]+$/i)[0];

exports.setProperContentType = (res, fileExtension) => {
    switch (fileExtension) {
        case '.js':
            res.type('.js');
            break;
        case '.html':
            res.type('.html');
            break;
        case '.css':
            res.type('.css');
            break;
        case '.ttf':
            res.type('.ttf');
            break;
        case '.webp':
            res.type('.webp');
            break;
    }
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

exports.parseWeatherData = data => {
    const {
        current,
        forecast: { forecastday },
    } = data;

    const currentDate = new Date(current.last_updated);

    const currentParsedResult = {
        temp: current.temp_c,
        condition: current.condition.text,
        humidity: current.humidity,
        windSpeed: current.wind_kph,
        date: currentDate.getDate(),
        day: days[currentDate.getDay()],
        month: months[currentDate.getMonth()],
        iconUrl: `https:${current.condition.icon}`,
    };

    const forecastParsedResult = forecastday.map(({ day, date }) => ({
        maxTemp: day.maxtemp_c,
        minTemp: day.mintemp_c,
        condition: day.condition.text,
        humidity: day.humidity,
        windSpeed: day.wind_kph,
        date: new Date(date).getDate(),
        day: days[new Date(date).getDay()],
        month: months[new Date(date).getMonth()],
        iconUrl: `https:${day.condition.icon}`,
    }));

    return [currentParsedResult, ...forecastParsedResult];
};
