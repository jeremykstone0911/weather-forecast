//Use built in JS functions to retrieve the date
let d = new Date();
let month = d.getMonth();
let year = d.getFullYear();
let dayOfTheMonth = d.getDate();
let fullDate = "(" + month + "/" + dayOfTheMonth + "/" + year + ")";

//set API key to variable
let APIkey = "525f5d4e5be315aa1f641b852de4f578";

//Get the city name from local storage or initialize it with KC
let cityName = JSON.parse(localStorage.getItem("city")) || "kansas city";

//Define query url based on cityName
let queryURL =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  cityName +
  "&appid=" +
  APIkey;

//Retrieve the cities from local storage or make an empty list
//Create buttons and add values
let cityButtonsArray = JSON.parse(localStorage.getItem("cities")) || [];
for (let i = 0; i < cityButtonsArray.length; i++) {
  let newCity = document.createElement("button");
  let buttonsDiv = document.getElementById("buttons");
  newCity.innerHTML = cityButtonsArray;
  newCity.classList.add(
    "btn",
    "border",
    "btn-block",
    "mt-0",
    "text-left",
    "city"
  );
  newCity.setAttribute("value", cityButtonsArray[i]);
  buttonsDiv.appendChild(newCity);
}

//Selector for input element
let city = document.getElementById("cityInput");

//Selector for search button
let search = document.getElementById("searchButton");

//Event listener for search button click
//New button appended to the list of cities
//API is called for weather info
search.addEventListener("click", function () {
  let newCity = document.createElement("button");
  let buttonsDiv = document.getElementById("buttons");
  newCity.innerHTML = city.value.toLowerCase();
  newCity.classList.add(
    "btn",
    "border",
    "btn-block",
    "mt-0",
    "text-left",
    "city"
  );
  newCity.setAttribute("value", "city.value.toLowerCase"());
  buttonsDiv.appendChild(newCity);
  cityButtonsArray.push(city.value.toLowerCase());
  localStorage.setItem("cities", JSON.stringify(cityButtonsArray));
  cityName = city.value;
  queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    APIkey;
  localStorage.setItem(city, JSON.stringify(cityName));
  callAPI();
});

//Event listener needed for all buttons
let buttons = document.getElementById("buttons");
let citySelect = document.querySelectorAll(".city");

//Event listener for stored city buttons
buttons.addEventListener("click", function () {
  if (event.target.matches(city)) {
    cityName = event.target.nodeValue;
    queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=" +
      APIkey;
    localStorage.setItem(city, JSON.stringify(cityName));
    callAPI();
  }

  //Function to retrieve weather data
  function callAPI() {
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (weatherData) {
        let dateIndex = 0;

        let cityNameFetched = weatherData.city.name;

        let weatherIcon = weatherData.list[dateIndex].weather[0].Icon;

        let temperature = weatherData.list[dateIndex].main.temperature;

        let humidity = weatherData.list[dateIndex].main.humidity;

        let windSpeed = weatherData.list[dateIndex].windSpeed;

        let latitude = JSON.stringify(weatherData.city.coord.lat);

        let longitude = JSON.stringify(weatherData.city.coord.lon);

        //HTML Selectors
        let cityNameSelector = document.getElementById("city-name");
        let temperatureSelector = document.getElementById("temperature");
        let humiditySelector = document.getElementById("humidity");
        let windSpeedSelector = document.getElementById("wind-speed");
        let weatherIconElement = document.createElement("img");

        // Updating Main HTML with API values
        cityNameSelector.textContent =
          cityNameFetched +
          " (" +
          month +
          "/" +
          dayOfTheMonth +
          "/" +
          year +
          ")";
        temperatureSelector.textContent =
          "Temperature: " + temperature + "\u00B0 F";
        humiditySelector.textContent = "Humidity: " + humidity + "%";
        windSpeedSelector.textContent = "Wind Speed: " + windSpeed + " MPH";
        cityNameSelector.appendChild(weatherIconElement);
        weatherIconElement.setAttribute(
          "src",
          "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
        );
      });
  }

  //Update 5-day forecast
  let day = 1;

  //While loop to cycle through each day
  while (day < 6) {
    dateIndex += 7;
    dayOfTheMonth += 1;
    fullDate = "(' + month + '/' + dayOfTheMonth + '/' + year + ')";
    weatherIcon = weatherData.list[dateIndex].weather[0].icon;
    temperature = weatherData.list[dateIndex].main.temp;
    humidity = weatherData.list[dateIndex].main.humidity;

    // Select the elements in the HTML
    let dateSelector = document.getElementById("date" + day);
    let weatherIconSelector = document.getElementById("weather-icon" + day);
    let tempSelector = document.getElementById("temp" + day);
    let humidSelector = document.getElementById("humid" + day);

    dateSelector.textContent = fullDate;
    weatherIconSelector.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
    );
    temperatureSelector.textContent = "Temp: " + temperature + "\u00B0 F";
    humidSelector.textContent = "Humidity: " + humidity + "%";

    //Rinse and repeat until Day 5
    day += 1;
  }
  //Set day back to current date
  dayOfTheMonth = d.getDate();
});
