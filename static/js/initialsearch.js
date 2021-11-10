'use strict';

//the initial 1 day and 7 day searches
//outputs url, json info

//get one airnow json string
// let api = "https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=55101&distance=10&API_KEY=65D54607-91C0-4049-93F6-04717AFA5B70";

// //text request, save for now:
// $.get(api, (result) => {
//     console.log(result);
//     console.log(result[0]["ReportingArea"])
//     displayResultsTest(result)
// });

// //shows results by key for test api request
// function displayResultsTest(result) {
//     for (let key in result[0]) {
//         $('#ajax').append(`<li>${key}: ${result[0][key]}</li>`)
//     }
// }


//shows results and graph on profile page
//posts new search to searches database
function displayResults(evt){
    evt.preventDefault();

    const zipcode= $('#zipcode').val();

    //url for today's data by user zipcode input
    let url = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zipcode}&distance=10&API_KEY=65D54607-91C0-4049-93F6-04717AFA5B70`;

    function makeSearchData(result) {
        //create key-value pairs to display and pass back to server.py
        //check if data has Ozone or PM2.5, get that key-value pair and make the other undefined
        //console.log("make search data");

        const searchData = {
            'Date': result[0]['DateObserved'],
            'Zipcode': $('#zipcode').val(),
            'Reporting Area': result[0]['ReportingArea'],
        };

        if (result[0]['ParameterName'] === 'Ozone') {
            searchData['Ozone'] = result[0]['AQI'];
            searchData['PM2.5'] = undefined;
        } else {
            searchData['Ozone'] = undefined;
            searchData['PM2.5'] = result[0]['AQI'];
        };

        searchData['Category'] = result[0]['Category']['Number'];

        return searchData;
      }

    function displayResultDetails(searchData) {
        //loop through key, values in search data to display on user profile
        //skip any keys with undefined values
        for (const key in searchData) {
            if (typeof searchData[key] !== 'undefined') {
                $('#display').append(`<li>${key}: ${searchData[key]}</li>`)
            }
        }
    }


    function displayChart(searchData) {
        return
    }

    function sendData(searchData) {
          //send searchData and user id back to server.py, as data
        const data = searchData;
        data.user_num = $('#user-num').text();
        console.log("data sent to server.py");
        //console.log(data);
        $.post('/savesearch', data);
    }

    console.log("in inner function");

    $.get(url, (result) => {
        const searchData = makeSearchData(result); 
        displayResultDetails(searchData);
        displayChart(searchData);
        sendData(searchData);
    });

  }

//on clicking submit, the functions above run
$('#newsearch-form').on('submit', displayResults);
