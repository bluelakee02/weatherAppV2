const {setProperContentType, getFileExtension, parseWeatherData} = require("./utils");
const fs = require('fs');
const path = require('path');
const axios = require('axios');

exports.compress = (req, res, next) => {
    const brotliFileExist = fs.existsSync(path.join(__dirname, 'dist', req.url + '.br'));
    const gzipFileExist = fs.existsSync(path.join(__dirname, 'dist', req.url + '.gz'));

    if (req.header('Accept-Encoding').includes('br') && brotliFileExist) {
        setProperContentType(res, getFileExtension(req.url));
        res.set('Content-Encoding', 'br');
        req.url = req.url + '.br';
    } else if (req.header('Accept-Encoding').includes('gz') && gzipFileExist) {
        setProperContentType(res, getFileExtension(req.url));
        res.set('Content-Encoding', 'gzip');
        req.url = req.url + '.gz';
    }

    next();
}

exports.getLocation = async (req, res) => {
    const {location, lattlong} = req.query;

    if (!location && !lattlong) {
        return res.send([{error: 'No location'}]);
    }

    const weatherApi = 'https://www.metaweather.com/api/location/';

    const apiRequest = lattlong ? `${weatherApi}search/?lattlong=${lattlong}` : `${weatherApi}search/?query=${location}`

    try {
        const response = await axios.get(apiRequest);
        const {data} = response;

        const woeid = data[0]?.woeid;

        if (!woeid) {
            return res.send([{error: `Location ${location} not found`}]);
        }

        const {data: {consolidated_weather}} = await axios.get(`${weatherApi}${woeid}`);

        if (response.status === 200) {
            return res.send([data[0], ...parseWeatherData(consolidated_weather)])
        } else {
            return res.send([{error: `External api error`}]);
        }
    } catch (err) {
        console.log(err)
    }
}
