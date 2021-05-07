function displayTemp(response) {
  console.log(response.data);
  let currentTempElement = document.querySelector("#currentTemp");
  currentTempElement.innerHTML = Math.round(response.data.main.temp);

  let currentCityElement = document.querySelector("#currentCity");
  currentCityElement.innerHTML = response.data.name;

  let weatherDescriptionElement = document.querySelector("#weatherDescription");
  
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
}

let apiKey = "69b40f8beeff9db6adde6eb2258de3ef";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=imperial`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemp);
