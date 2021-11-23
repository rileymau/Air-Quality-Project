//extended yearlong search functions

//tbd make a extendedchart.js

//get all dates (and six_days?) for each search
//get six day and main search date from html or chart.js
//make graph of those dates.
//add a trendline if possible. 

const zipcode = $('#search-zipcode').text();

function makeChart(result) {
    //make the graph with big list of zipcodes, ozones, pm's.
    new Chart($('#zipcode-chart'), {
        type: 'bar',
        data: {
          labels: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],
          //from six_days -> [day for day in six_days] (if python)
          datasets: [
            {
              label: 'Ozone AQI',
              data: [10, 36, 27, 12, 16, 32, 41],
              //from graphOzone
            },
            {
              label: 'PM 2.5 AQI',
              data: [5, 10, 7, 5, 8, 12, 15],
              //from graphPM
            },
          ],
        },
      });
};

$.get('/allzipsearch', result => {makeChart(result)})