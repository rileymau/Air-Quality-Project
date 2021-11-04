'use strict';

//the initial 1 day and 7 day searches
//outputs url, json info
//setup routes later

//tbd make a chart.js

console.log("here");

//get one airnow json string
//let api = "https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipcode=55101&distance=10&API_KEY="
let api = "https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=55101&distance=10&API_KEY="

//${AIRNOWKEY}
//use later 

//text request, save for now:
//let api = "https://www.airnowapi.org/aq/observation/zipCode/current/?format=text/csv&zipCode=55101&distance=10&API_KEY="
$.get(api, (result) => {
    console.log(result);
    console.log(result[0]["ReportingArea"])
    displayResults(result)
});

//data before today's: 
//$.get("https://aq/observatiion/zipCode/historical...", (result) => {console.log(result)}); 

function displayResults(result) {
    for (let key in result[0]) {
        $('#ajax').append(`<li>${key}: ${result[0][key]}</li>`)
    }
}
