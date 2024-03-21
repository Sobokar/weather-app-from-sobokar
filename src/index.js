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

function displayForecast() {
  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` 
  <div class="weather-forecast-date">
    <div class="weather-forcast-day">${day}</div>
    <div class="weather-forecast-icon">☀️</div>
            
        <div class="weather-forecast-temperature">
                      <span class="weather-forecast-temperature-max">26°</span>
                      <span class="weather-forecast-temperature-min">20°</span>
        </div>
 </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
searchCity("Kyiv");
displayForecast();
