const container = document.querySelector('.container')
const search  = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error = document.querySelector('.not-found')



search.addEventListener('click', async() => {
    const city = document.querySelector('.search-box input').value;

    if(city == '')
        return;

     await fetch(`http://localhost:4001/weather?city=${city}`)
        .then(response => response.json())
        .then(json => {

    
            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error.classList.remove('active');

            const image = document.querySelector('.weather-box img')
            const temperature = document.querySelector('.weather-box .temperature')
            const description = document.querySelector('.weather-box .description')
            const humidity = document.querySelector('.weather-details .humidity span') 
            const wind = document.querySelector('.weather-details .wind span')

            console.log(json);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'assets/clear.png'
                    break;
                    
                case 'Rain':
                    image.src = 'assets/rain.png'
                    break;

                case 'Snow':
                    image.src = 'assets/snow.png'
                    break;

                case 'Clouds':
                    image.src = 'assets/cloud.png'
                    break;

                case 'Mist':
                case 'Haze': 
                    image.src = 'assets/mist.png'
                    break;
            
                default:
                    image.src = 'assets/cloud.png'
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<apan>ºC</apan>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

        })
        .catch(err => {
            // En caso de error en la solicitud fetch
            console.error('Error fetching weather data:', err);
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error.classList.add('active');

            // Mostrar la imagen y el mensaje de error
            error.innerHTML = `
            <div class="box">
            <img src="./assets/error.png" >
            <p>Oops! Location not found!</p>
            </div>
    
            `;
        });
})
