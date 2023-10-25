function formatDate(timestamp) {
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
  console.log(response.data);
  let cityName = document.querySelector(".city-name");
  let cityTemp = document.querySelector(".temp-value");
  let weatherDescription = document.querySelector(".weather-description");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let dayAndTime = document.querySelector(".day-and-time");
  let weatherIcon = document.querySelector("#weather-icon");

  cityName.innerHTML = response.data.name;
  cityTemp.innerHTML = Math.round(response.data.main.temp);
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  dayAndTime.innerHTML = formatDate(response.data.timezone * 1000);
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);
}

let apiKey = "294ff1c8d42a84a37badb92d65cbfb69";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=singapore&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
