function displayWeather(response) {
  let currentTemperature = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windspeed");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let iconImage = document.querySelector("#icon");

  console.log(response.data);
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/hr`;
  currentTemperature.innerHTML = Math.round(temperature);
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

function getForecast(city) {
  let apiKey = "f80c43e79144055afb51f7885ft48o7e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="forecast-day">
              <div class="forecast-date">${day}</div>
              <div class="forecast-icon">☀</div>
              <div class="forecast-temperature">
              <div class="forecast-temp-max">
                  <strong>18°</strong></div>
                <div class="forecast-temp-min"> 12°</div>
            </div>
          </div>
`;
  });
  let dailyForecast = document.querySelector("#daily-forecast");
  dailyForecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector(".search-form");

searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Brussels");
