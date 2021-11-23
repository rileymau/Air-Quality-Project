//extended yearlong search functions

//tbd make a extendedchart.js

//get all dates (and six_days?) for each search
//get six day and main search date from html or chart.js
//make graph of those dates.
//add a trendline if possible. 
// can do list(set(list of dates)). 

const zipcode = $('#search-zipcode').text();
//const searchDate
//const searchAQI
//const searchLabel

function makeAllZipChart(result) {
    //make the graph with big list of zipcodes, ozones, pm's.
    new Chart($('#zipcode-chart'), {
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

$.get('/allzipsearch', result => {makeAllZipChart(result)})


function makeMonthlyChart(result) {
  //make the graph with current search date, and first day of month for the last year.

  new Chart($('#monthly-chart'), {
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

$.get('/allzipsearch', result => {makeMonthlyChart(result)})


function makeSpecDateChart(date) {
  //make the graph the current search and a previous date.

  //$.get(url${date}, result => {
  //   AQI = result[0]['API'];
  // })
  
  new Chart($('#spec-date-chart'), {
      type: 'bar',
      data: {
        labels: ['day1'],
        datasets: [
          {
            label: 'AQI',
            data: AQI,
            backgroundColor: 'rgba(255, 100, 130, 0.5)',
            borderColor: 'rgba(255, 100, 130)',
          },
        ],
      },
    });
};


function makePrevWeekChart(result) {
  //make the graph with the current search, last 6 days, and previous week.
  new Chart($('#prev-week-chart'), {
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
