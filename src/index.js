function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-city");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#city-searching-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function searchCity(city) {
  let apiKey = "9400caa5odc3060fcf5ba1d37t3aaf2c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(updateweatherInfo);
}

function updateweatherInfo(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let currentTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#app-city");
  let conditionsElement = document.querySelector("#conditions");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(currentTemperature);
  cityElement.innerHTML = response.data.city;
  conditionsElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src = "${response.data.condition.icon_url}" class="weather-app-icon" />`;

  timeElement.innerHTML = formatDate(date);
  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}
//сreate a function to get a forecast data from API

function getForecast(city) {
  let apiKey = "9400caa5odc3060fcf5ba1d37t3aaf2c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` 
  <div class="weather-forecast-date">
    <div class="weather-forecast-day">${formatDay(day.time)}</div>
  
    <img src= "${day.condition.icon_url}" class="weather-forecast-icon" />
   
            
        <div class="weather-forecast-temperature">
                      <span class="weather-forecast-temperature-max">${Math.round(
                        day.temperature.maximum
                      )}°</span>
                      <span class="weather-forecast-temperature-min">${Math.round(
                        day.temperature.minimum
                      )}°</span>
        </div>
 </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
searchCity("Kyiv");

displayForecast();
