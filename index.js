const apiKey = '92f76f31fdf1d6723a753d24b665259c';
const searchBox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search');
const cityName = document.querySelector('.city-name');
const cityTemp = document.querySelector('.city-temp');
const cityIcon = document.querySelector('.city-icon');
const cityDetails = document.querySelector('.city-details');
const hehe= document.querySelector('.body');

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data);
        
        
        if (data.cod !== 200) {
            alert('Invalid city name');
            return;
        }

        cityName.textContent = data.name;
        cityTemp.textContent = `${data.main.temp}°C`;
        cityIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        cityIcon.alt = data.weather[0].description;
        cityDetails.innerHTML = `
            <div>
                <p>Weather: ${data.weather[0].description}</p>
                </div>
                <div>
                <p>Humidity: ${data.main.humidity}%</p>
            </div>
            <div>
                <p>Pressure: ${data.main.pressure} hPa</p>
                </div>
                <div>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again later.');
    }
}

searchButton.addEventListener('click', () => {
    if (searchBox.value.trim() !== '') {
        fetchWeather(searchBox.value);
        hehe.style.display = "block";

    }
});

searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && searchBox.value.trim() !== '') {
        fetchWeather(searchBox.value);
        hehe.style.display = "block";
    }
});
