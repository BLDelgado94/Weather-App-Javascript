require('dotenv').config();

const APIKey = process.env.API_KEY
const container = document.querySelector('.container-card');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = apiKey;
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'weather-icons/clear.png';
                    break;

                case 'Rain':
                    image.src = 'weather-icons/rain.png';
                    break;

                case 'Snow':
                    image.src = 'weather-icons/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'weather-icons/cloud.png';
                    break;

                case 'Mist':
                    image.src = 'weather-icons/mist.png';
                    break;

                case 'Fog':
                    image.src = 'weather-icons/fog.png';
                    break;

                default:
                    image.src = '';
            }

            const temperatureCelsius = parseInt(json.main.temp);
            const temperatureFahrenheit = Math.round(temperatureCelsius * 9/5) + 32;

            temperature.innerHTML = `${temperatureFahrenheit}<span>°F</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });

});