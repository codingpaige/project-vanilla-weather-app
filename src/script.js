function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
     <div class="weather-forecast-day">${day}</div>
    <img src="https://openweathermap.org/img/wn/04d@2x.png"
    alt="mostly-cloudy" width="42"/>
    <span class="weather-forecast-temp-max">
    18°
    </span> <span class="weather-forecast-temp-min">
    12°
    </span>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "88724523008dc9e1be18f6eb6a959b67";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let cityName = document.querySelector(".city-name");
  let cityTemp = document.querySelector(".temp-value");
  let weatherDescription = document.querySelector(".weather-description");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let dayAndTime = document.querySelector(".day-and-time");
  let weatherIcon = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  cityTemp.innerHTML = Math.round(celsiusTemperature);
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  dayAndTime.innerHTML = formatDate(response.data.dt);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);
  getForecast(response.data.coord);
}

function calculateFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let tempValue = document.querySelector(".temp-value");
  tempValue.innerHTML = Math.round((31 * 9) / 5 + 32);
}

function calculateCelsius(event) {
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  event.preventDefault();
  let tempValue = document.querySelector(".temp-value");
  tempValue.innerHTML = Math.round(celsiusTemperature);
}

function search(city) {
  let apiKey = "294ff1c8d42a84a37badb92d65cbfb69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
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

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-metric");
fahrenheitLink.addEventListener("click", calculateFahrenheit);

let celsiusLink = document.querySelector("#celsius-metric");
celsiusLink.addEventListener("click", calculateCelsius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Singapore");
displayForecast();
