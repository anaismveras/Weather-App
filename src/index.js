/*Date and Time*/

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

/*Whole Application function to make sure everything connects*/

function displayTemp(response) {
  console.log(response.data);
  let currentTempElement = document.querySelector("#currentTemp");
  currentTempElement.innerHTML = Math.round(celsiusTemp);

  celsiusTemp = response.data.main.temp;

  let currentCityElement = document.querySelector("#currentCity");
  currentCityElement.innerHTML = response.data.name;

  let weatherDescriptionElement = document.querySelector("#weatherDescription");

  weatherDescriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#current-date-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

/*Search Engine*/

function search(city) {
  let apiKey = "69b40f8beeff9db6adde6eb2258de3ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("New York");

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

/*Switching temp from C to F*/

function displayfahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  //remove active class from celsius Link
  CelsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTempElement = document.querySelector("#currentTemp");
  currentTempElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemp);

/*Switching temp from F to C*/

function displayCelsiusTemp(event) {
  event.preventDefault();
  CelsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTempElement = document.querySelector("#currentTemp");
  currentTempElement.innerHTML = Math.round(celsiusTemp);
}

let CelsiusLink = document.querySelector("#celsius-link");
CelsiusLink.addEventListener("click", displayCelsiusTemp);
