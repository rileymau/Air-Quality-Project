'use strict';

//make chart with date from most recent search.
//try to get 6 days with jsonify
//or, get 6 day list from homepage hidden divs. 

function makeChart() {
    //make chart with date from most recent search.
    new Chart($('#most-recent-chart'), {
        type: 'bar',
        data: {
          labels: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],
          datasets: [
            {
              label: 'AQI',
              data: [10, 36, 27, 12, 16, 32, 41],
            },
          ],
        },
      });
};