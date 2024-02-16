document.getElementById('weatherForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const city = document.getElementById('inputCity').value;
    try {
        const response = await fetch(`/weather?city=${city}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const weatherData = await response.json();
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `
            <h2>${weatherData.name}</h2>
            <p>Temperature: ${weatherData.main.temp} °C</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
            <p>Pressure: ${weatherData.main.pressure} hPa</p>
            <p>Wind Speed: ${weatherData.wind.speed} km/h</p>
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data");
    }
});