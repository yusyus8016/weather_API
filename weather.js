document.getElementById('weatherForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    document.querySelector('.target').classList.add('query-submitted');
    const city = document.getElementById('inputCity').value;
    try {
        const response = await fetch(`http://localhost:4001/weather?city=${city}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const weatherData = await response.json();
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `
            <h2 class="name">${weatherData.name}</h2>
            <p>Temperatura: ${weatherData.main.temp} °C</p>
            <p>Humedad: ${weatherData.main.humidity}%</p>
            <p>Presion: ${weatherData.main.pressure} hPa</p>
            <p>velocidad del viento: ${weatherData.wind.speed} km/h</p>
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data");
    }
});
