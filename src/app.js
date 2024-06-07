function displayWeather(response) {
  let currentTemperature = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windspeed");
  let feelsLike = document.querySelector("#feels-like");
  let feelsTemperature = response.data.temperature.feels_like;
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let iconImage = document.querySelector("#icon");
  console.log(response.data.temperature);

  console.log(response.data.temperature.feels_like);
  cityElement.innerHTML = `${response.data.city}, ${response.data.country}`;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML =
    response.data.condition.description.charAt(0).toUpperCase() +
    response.data.condition.description.slice(1);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  currentTemperature.innerHTML = Math.round(temperature);
  feelsLike.innerHTML = `${Math.round(feelsTemperature)}°`;
  iconImage.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let currentDay = date.getDate();
  let fullYear = date.getFullYear();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let month = months[date.getMonth()];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${month} ${currentDay}, ${fullYear}<br/>${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "f80c43e79144055afb51f7885ft48o7e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "f80c43e79144055afb51f7885ft48o7e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="forecast-day">
              <div class="forecast-date">${formatDay(day.time)}</div>
              <img src="${day.condition.icon_url}" class="forecast-icon" />
              <div class="forecast-temperature">
              <div class="forecast-temp-max">
                  <strong>${Math.round(day.temperature.maximum)}°</strong></div>
                <div class="forecast-temp-min">${Math.round(
                  day.temperature.minimum
                )}°</div>
            </div>
          </div>
`;
    }
  });
  let dailyForecast = document.querySelector("#daily-forecast");
  dailyForecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector(".search-form");

searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Brussels");

//function to change theme
function changeTheme() {
  let body = document.querySelector("body");
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }
}
let themeButton = document.querySelector(".slider");
themeButton.addEventListener("click", changeTheme);
