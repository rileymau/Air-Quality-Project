'use strict';

//the initial 1 day and 7 day searches
//outputs url, json info
//setup routes later

//tbd make a chart.js

console.log("here");
//console.log(secrets.sh/AIRNOWKEY)

//get one airnow json string
//let api = "https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipcode=55101&distance=10&API_KEY="
let api = "https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=55101&distance=10&API_KEY=";

//${AIRNOWKEY}
//use later 

//text request, save for now:
//let api = "https://www.airnowapi.org/aq/observation/zipCode/current/?format=text/csv&zipCode=55101&distance=10&API_KEY="
$.get(api, (result) => {
    console.log(result);
    console.log(result[0]["ReportingArea"])
    displayResultsTest(result)
});

//data before today's: 
//$.get("https://aq/observatiion/zipCode/historical...", (result) => {console.log(result)}); 

//shows results by key for test api request
function displayResultsTest(result) {
    for (let key in result[0]) {
        $('#ajax').append(`<li>${key}: ${result[0][key]}</li>`)
    }
}


//shows results and graph on profile page
//posts new search to searches database
function displayResults(evt){
    evt.preventDefault();

    const zipcode= $('#zipcode').val();
    const date= $('#date').val();
    // if date === today
    //     const date= datetiime.now()
    // if date === week
    const AIRNOWKEY="";
    let url = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zipcode}&distance=10&API_KEY=${AIRNOWKEY}`;
  
    function displayResultDetails(result) {
        for (let key in result[0]) {
            $('#display').append(`<li>${key}: ${result[0][key]}</li>`)
        }
    }

    function displayChart(result) {
        return
    }

    console.log("in inner function")

    $.get(url, (result) => {
        displayResultDetails(result);
        displayChart(result);
    });

  }
  
//on clicking submit, the functions above run
$('#newsearch-form').on('submit', displayResults);