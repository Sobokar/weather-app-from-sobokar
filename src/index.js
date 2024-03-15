function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-city");
  let cityElement = document.querySelector("#app-city");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#city-searching-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);
