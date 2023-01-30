/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const { config } = require('dotenv');
const express = require('express');
const helmet = require('helmet');

const { compress, getLocation } = require('./controllers');

const app = express();

config();

app.use(
    helmet({
        frameguard: {
            action: 'deny',
        },
        dnsPrefetchControl: {
            allow: true,
        },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", 'https://cdn.weatherapi.com/'],
                styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
            },
        },
    }),
);

app.get('/*.js|*.css|*.html|*.ttf/', compress);

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/getLocation', getLocation);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log('App is listening on port ' + port);
