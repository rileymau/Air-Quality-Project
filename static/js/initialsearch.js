'use strict';

//the initial 1 day and 7 day searches
//outputs url, json info

//get one airnow json string
let api = "https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=55101&distance=10&API_KEY=65D54607-91C0-4049-93F6-04717AFA5B70";

//text request, save for now:
$.get(api, (result) => {
    console.log(result);
    console.log(result[0]["ReportingArea"])
    displayResultsTest(result)
});

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
    //const date= $('#date').val();

    //url for today's data by user zipcode input
    let url = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zipcode}&distance=10&API_KEY=65D54607-91C0-4049-93F6-04717AFA5B70`;

    let user_id = $('user-num').html

    function makeSearchData(result) {
        //create key-value pairs to display and pass back to server.py
        console.log("make search data");
        console.log(result);
        const searchData = {
            'date': result[0]['DateObserved'],
            'zipcode': $('#zipcode').val(),
            'reporting_area': result[0]['ReportingArea'],
            // if result.hasOwnProperty('Ozone') { 
            //     'ozone': result[0]['Ozone'],
            //     'pm': None,
            // } else {
            //     'ozone': None,
            //     'pm': result[0]['PM2.5'],
            // },
            'category': result[0]['Category']['Number']
        };
        return(searchData);
      }

    function displayResultDetails(searchData) {
        for (const key in searchData) {
            $('#display').append(`<li>${key}: ${searchData[key]}</li>`)
        }
    }

    function displayChart(searchData) {
        return
    }

    function sendData(searchData, user_id) {
          //send searchData and user id back to server.py
          $.post('/savesearch', searchData, user_id);
    }

    console.log("in inner function");

    $.get(url, (result) => {
        console.log(result);
        const searchData = makeSearchData(result); 
        displayResultDetails(searchData);
        displayChart(searchData);
        sendData(searchData);
    });

  }

//on clicking submit, the functions above run
$('#newsearch-form').on('submit', displayResults);

//for 7 day search
//data before today's: 
//$.get("https://aq/observatiion/zipCode/historical...", (result) => {console.log(result)}); 
