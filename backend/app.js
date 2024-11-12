const express = require('express');
const app = express();
const port = 3031;
require('dotenv').config();
const cors = require('cors');

app.use(express.json());


app.listen(port, () => {
    console.log(`Berjalan di http://localhost${port}`)
});