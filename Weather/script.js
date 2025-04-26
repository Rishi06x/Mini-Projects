const apiKey = "54f838b8f7e4e2396a51f4a3f47971b1"; // Your OpenWeatherMap API key

const searchBtn = document.querySelector("button");
const cityInput = document.querySelector(".cityInput");
const weatherText = document.querySelector(".weather-section p");
const tempText = document.querySelector(".temp");
const cityText = document.querySelector(".city");
const humidityText = document.querySelector(".humidity h2");
const windText = document.querySelector(".wind h2");
const weatherImage = document.querySelector(".weather-section img");


const loadingContainer = document.querySelector(".loading-container");
const weatherSection = document.querySelector(".weather-section");
const otherDetails = document.querySelector(".other-details");

async function checkWeather() {
  const cityName = cityInput.value.trim();

  if (cityName === "") {
    alert("Please enter a city name!");
    return;
  }

  // Show loading, hide content
  loadingContainer.classList.remove("hidden");
  weatherSection.classList.add("hidden");
  otherDetails.classList.add("hidden");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      cityText.textContent = data.name;
      tempText.textContent = `${data.main.temp}°C`;
      humidityText.textContent = `Humidity: ${data.main.humidity}%`;
      windText.textContent = `Wind: ${data.wind.speed} km/h`;
      weatherText.textContent = data.weather[0].description;

      const weatherMain = data.weather[0].main;
      
      switch (weatherMain) {
        case "Clear":
          weatherImage.src = "images/sun.png"; break;
        case "Clouds":
          weatherImage.src = "images/cloud.png"; break;
        case "Rain":
          weatherImage.src = "images/rain.png"; break;
        case "Snow":
          weatherImage.src = "images/snow.png"; break;
        case "Thunderstorm":
          weatherImage.src = "images/storm.png"; break;
        case "Drizzle":
          weatherImage.src = "images/drizzle.png"; break;
        case "Mist":
          weatherImage.src = "images/mist.png"; break;
        case "Haze":
          weatherImage.src = "images/mist.png"; break;
        case "Fog":
          weatherImage.src = "images/snow.png"; break;
        case "Dust":
          weatherImage.src = "images/dust.jpeg"; break;
        case "Sand":
          weatherImage.src = "images/dust.jpeg"; break;
        case "Ash":
          weatherImage.src = "images/dust.jpeg"; break;
        case "Squall":
          weatherImage.src = "images/windy.png"; break;
        case "Tornado":
          weatherImage.src = "images/tornado.jpeg"; break;
        default:
          weatherImage.src = ""; break;
      }

    } else {
      alert("City not found!");
    }
  } catch (error) {
    alert("Failed to fetch weather data!");
  } finally {
    // Hide loading, show content
    loadingContainer.classList.add("hidden");
    weatherSection.classList.remove("hidden");
    otherDetails.classList.remove("hidden");
  }
}

    
// Attach function to button click
searchBtn.addEventListener("click", checkWeather);
