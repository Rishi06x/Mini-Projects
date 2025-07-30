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

function getCityHour(timezoneOffsetInSeconds) {
 const utcTime = new Date(); 
 const cityTime = new Date(utcTime.getTime() + timezoneOffsetInSeconds * 1000);
 return cityTime.getHours();
}

function isValidCityName(cityName) {
 if (cityName.length < 2) {
   return false;
 }
 
 const cityPattern = /^[a-zA-Z\s\-'\.]+$/;
 if (!cityPattern.test(cityName)) {
   return false;
 }
 
 if (/^\d+$/.test(cityName)) {
   return false;
 }
 
 if (/^[\s\-'\.]+$/.test(cityName)) {
   return false;
 }
 
 if (/^(.)\1+$/.test(cityName.replace(/\s/g, ''))) {
   return false;
 }
 
 const gibberishPatterns = [
   /^(qwerty|asdf|zxcv|qaz|wsx)/i, 
   /^(abc|xyz|test|hello|world|weather|temp|climate|city|place)$/i, 
   /^[aeiou]+$/i,  
   /^[bcdfghjklmnpqrstvwxyz]+$/i,  
 ];
 
 for (let pattern of gibberishPatterns) {
   if (pattern.test(cityName)) {
     return false;
   }
 }
 
 return true;
}

async function checkWeather() {
 const cityName = cityInput.value.trim();

 if (cityName === "") {
   alert("Please enter a city name!");
   return;
 }

 if (!isValidCityName(cityName)) {
   alert("Please enter a valid city name! City names should only contain letters, spaces, hyphens, and apostrophes.");
   return;
 }

 loadingContainer.classList.remove("hidden");
 weatherSection.classList.add("hidden");
 otherDetails.classList.add("hidden");

 const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

 try {
   const response = await fetch(url);
   const data = await response.json();

   console.log(data); 

   if (data.cod === 200) {
     if (!data.name || !data.main || !data.weather) {
       alert("Invalid location data received. Please enter a valid city name!");
       return;
     }

     cityText.textContent = data.name;
     tempText.textContent = `${data.main.temp}°C`;
     humidityText.textContent = `Humidity: ${data.main.humidity}%`;
     windText.textContent = `Wind: ${data.wind.speed} km/h`;
     weatherText.textContent = data.weather[0].description;

     const weatherMain = data.weather[0].main;

     const cityHour = getCityHour(data.timezone);
     const timeOfDay = (cityHour >= 6 && cityHour < 18) ? "day" : "night";

     switch (weatherMain) {
       case "Clear":
         weatherImage.src = timeOfDay === "day" ? "./images/sun.png" : "./images/nightClear.webp";
         break;
       case "Clouds":
         weatherImage.src = timeOfDay === "day" ? "./images/cloud.png" : "./images/nightCloud.webp";
         break;
       case "Rain":
         weatherImage.src = "./images/rain.png" 
         break;
       case "Snow":
         weatherImage.src =  "./images/snow.png";
         break;
       case "Thunderstorm":
         weatherImage.src = "./images/storm.png";
         break;
       case "Drizzle":
         weatherImage.src = timeOfDay === "day" ? "./images/drizzle.png" : "./images/nightDrizzle.png";
         break;
       case "Mist":
         weatherImage.src = "./images/mist.png"; 
       case "Haze":
         weatherImage.src = "./images/mist.png"; 
         break;
       case "Fog":
         weatherImage.src = "./images/snow.png";
         break;
       case "Dust":
         weatherImage.src = "./images/dust.jpeg"; 
       case "Sand":
         weatherImage.src = "./images/dust.jpeg"; 
       case "Ash":
         weatherImage.src = "./images/dust.jpeg";
         break;
       case "Squall":
         weatherImage.src = "./images/windy.png";
         break;
       case "Tornado":
         weatherImage.src = "./images/tornado.jpeg";
         break;
       default:
         weatherImage.src = "Error loading image"; 
         break;
     }

   } else if (data.cod === "404") {
     alert("City not found! Please enter a valid city name.");
   } else {
     alert("Unable to fetch weather data. Please check the city name and try again.");
   }
 } catch (error) {
   console.error("Error fetching weather data:", error);
   alert("Failed to fetch weather data! Please check your internet connection and try again.");
 } finally {
   loadingContainer.classList.add("hidden");
   weatherSection.classList.remove("hidden");
   otherDetails.classList.remove("hidden");
 }
}

cityInput.addEventListener("keypress", function(event) {
 if (event.key === "Enter") {
   checkWeather();
 }
});

searchBtn.addEventListener("click", checkWeather);