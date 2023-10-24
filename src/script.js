function formatDayandDate(timestamp) {
  let date = new Date(timestamp);
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

function displayTemperature(response) {
  let cityName = document.querySelector(".city-name");
  let cityTemp = document.querySelector(".temp-value");
  let weatherDescription = document.querySelector(".weather-description");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let dayAndTime = document.querySelector(".day-and-time");

  cityName.innerHTML = response.data.name;
  cityTemp.innerHTML = Math.round(response.data.main.temp);
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  dayAndTime.innerHTML = formatDayandDate(response.data.dt * 1000);
}

let apiKey = "294ff1c8d42a84a37badb92d65cbfb69";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Singapore&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
