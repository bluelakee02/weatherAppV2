const express = require('express');
const path = require('path');
const helmet = require('helmet');
const {compress, getLocation} = require("./controllers");

const app = express();

// app.use(helmet({
//     frameguard: {
//         action: 'deny'
//     },
//     dnsPrefetchControl: {
//         allow: true
//     }
// }));

app.get('/*.js|*.css|*.html|*.ttf/', compress);

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get("/getLocation", getLocation);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

const port = process.env.PORT || 3000;
app.listen(port);

console.log('App is listening on port ' + port);
