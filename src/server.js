const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./api/db');
const api = require('./api/routers');

const app = express();
const apiPort = 3005;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api', api);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
