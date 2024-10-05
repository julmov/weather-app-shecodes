const getForecast = (city) => {
  let apiKey = "6557bae1f19ecd4eect5adbe4o7e0153";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
};

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let display = document.querySelector(".current-weather");
  display.classList.add("current-weather-display");
  

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity + "%";
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed + "km/h";

  let description = document.querySelector("#current-description");
  description.innerHTML = response.data.condition.description;

  let icon = document.querySelector(".current-temperature-icon");
  icon.innerHTML = `<img id="weather-icon" src="${response.data.condition.icon_url}" alt="Weather icon" />`;

  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "6557bae1f19ecd4eect5adbe4o7e0153";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

const formatDay = (timestamp) => {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()]
} 

const displayForecast = (response) => {
  let forecast = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if(index < 5){
       let timestamp = day.time; 

      forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(timestamp)}</div>
    <img class="weather-forecast-icon" src="${day.condition.icon_url}" />
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
      </div>
      <div class="weather-forecast-temperature"> ${Math.round(
        day.temperature.minimum
      )}°</div>
    </div>
  </div>`;
    }
  });

  forecast.innerHTML = forecastHtml;
};
