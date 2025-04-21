const apiKey = "54f838b8f7e4e2396a51f4a3f47971b1"; // Your OpenWeatherMap API key

const searchBtn = document.querySelector("button");
const cityInput = document.querySelector(".cityInput");
const weatherText = document.querySelector(".weather-section p");
const tempText = document.querySelector(".temp");
const cityText = document.querySelector(".city");
const humidityText = document.querySelector(".humidity h2");
const windText = document.querySelector(".wind h2");
const weatherImage = document.querySelector(".weather-section img");

async function checkWeather() {
    const cityName = cityInput.value.trim();

    if (cityName === "") {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    // You can also display weather data like this:
    if (data.cod === 200) {
        cityText.textContent = data.name;
        tempText.textContent = `${data.main.temp}°C`;
        humidityText.textContent = `Humidity: ${data.main.humidity}%`;
        windText.textContent = `Wind: ${data.wind.speed} km/h`;
        weatherText.textContent = data.weather[0].description;
        // Optional: set weather icon
        // weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        if(data.weather[0].main === "Clear") {
            weatherImage.src = "images/sun.png";
        }
        else if(data.weather[0].main === "Clouds") {
            weatherImage.src  = "images/cloud.png";
        }
        else if(data.weather[0].main === "Rain") {
            weatherImage.src  = "images/rain.png";
        }
        else if(data.weather[0].main === "Snow") {
            weatherImage.src  = "images/snow.png";
        }
        else if(data.weather[0].main === "Thunderstorm") {
            weatherImage.src  = "images/storm.png";
        }
        else if(data.weather[0].main === "Drizzle") {
            weatherImage.src  = "images/wind.png";
        }
        else if(data.weather[0].main === "Mist") {
            weatherImage.src = "images/mist.png";
        }
        else if(data.weather[0].main === "Fog") {
            weatherImage.src = "images/snow.png";
        }
    } else {
        alert("City not found!");
    }
}

// Attach function to button click
searchBtn.addEventListener("click", checkWeather);
