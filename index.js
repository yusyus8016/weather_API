// 3d44bce85822d085e12abe8eba7e3380
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors')
const port = 4001;

app.use(express.static(__dirname));

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/weather.html');
});


app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = '3d44bce85822d085e12abe8eba7e3380'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});