const express = require('express');
const app = express();
const port = 3031;
require('dotenv').config();
const cors = require('cors');
const travel = require('./route/TravelRoutes');

app.use(express.json());

app.use(cors());

app.use('/', travel);

app.listen(port, () => {
    console.log(`Berjalan di http://localhost:${port}`)
});