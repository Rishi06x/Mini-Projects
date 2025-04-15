

const apiKey = "54f838b8f7e4e2396a51f4a3f47971b1"; // Replace with your OpenWeatherMap API key

const searchBtn = document.querySelector("button");
const cityInput = document.querySelector(".cityInput");
const weatherText = document.querySelector(".weather-section p");
const tempText = document.querySelector(".temp");
const cityText = document.querySelector(".city");
const humidityText = document.querySelector(".humidity h2");
const windText = document.querySelector(".wind h2");
const weatherImage = document.querySelector(".weather-section img");

const cityName = cityInput.value.trim();

const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

async function checkWeather() {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    
}

checkWeather();