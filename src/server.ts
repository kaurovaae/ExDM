import express                          from 'express';
import bodyParser                       from 'body-parser';
import cors                             from 'cors';
import db                               from './api/db';
import api                              from './api/routers';

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
