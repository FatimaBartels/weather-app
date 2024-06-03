function searchCity(city) {
  let apiKey = "f80c43e79144055afb51f7885ft48o7e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query={query}&key={apiKey}&units=metric`;
  // make api call and update the interface
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector(".search-form");

searchFormElement.addEventListener("submit", searchSubmit);
