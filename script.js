//Use built in JS functions to retrieve the date
let d = new Date();
let month = d.getMonth();
let year = d.getFullYear();
let dayOfTheMonth = d.getDate();
let fullDate = "(" + month + "/" + dayOftheMonth + "/" + year + ")";

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
