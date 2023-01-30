/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const axios = require('axios');

const { setProperContentType, getFileExtension, parseWeatherData } = require('./utils');

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
};

exports.getLocation = async (req, res) => {
    const { location, lattlong } = req.query;

    if (!location && !lattlong) {
        return res.send([{ error: 'No location' }]);
    }

    const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}`;

    const apiRequest = `${weatherApi}&q=${location || lattlong}&days=5&aqi=no&alerts=no`;

    try {
        const response = await axios.get(apiRequest);
        const {
            data: { location },
            error,
        } = response;

        if (error) {
            return res.send([{ error: error.message }]);
        }

        if (response.status === 200) {
            return res.send([location, ...parseWeatherData(response.data)]);
        } else {
            return res.send([{ error: `External api error` }]);
        }
    } catch (err) {
        console.log(err);
    }
};
