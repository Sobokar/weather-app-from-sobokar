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
  axios.get(apiUrl).then(updateTemperature);
}

function updateTemperature(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let currentTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(currentTemperature);

  let cityElement = document.querySelector("#app-city");

  console.log(response.data.city);
  cityElement.innerHTML = response.data.city;
}

searchCity("Kyiv");
