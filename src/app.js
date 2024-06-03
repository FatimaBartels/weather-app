function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector(".search-form");

searchFormElement.addEventListener("submit", searchSubmit);
