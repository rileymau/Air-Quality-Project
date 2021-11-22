'use strict';

//Create graph data from saved search and 6 new API calls.
//Create chart from graph data.
//only today is saved in searches db, any search can be turned into 7 days. 

    //get search date
const today = $('#search-date').text();
const zipcode = $('#search-zipcode').text();
const six_days = $('#six-day-list').text();

console.log(six_days)
console.log(today)
//get 6 days of dates from search details page. 
//make chart of 7 dates. 
//fill in date, pm and ozone from search already done. 


function makeBigData(res) {
    const data = [];
    const graphOzone = [];
    const graphPM = [];
    const graphCat = [];

    for (const day in six_days) {

        function makeGraphData(result) {
            data['Ozone AQI'] = result[0]['Ozone'];
            data['PM2.5 AQI'] = result[0]['PM2.5'];
            data['Category'] = result[0]['Category']['Number'];
            return data
        };

        function storeGraphData(data) {

            graphOzone.push.data['Ozone AQI'];
            graphPM.push.data['PM2.5 AQI'];
            graphCat.push.data['Category'];
        };

        $.get("https://aq/observation/zipCode/historical ...${day} ..${zipcode}.", (result) => {
                console.log(result);
                makeGraphData(result);
                storeGraphData();
            }); 
        };
    //pass date, pm, ozone to chart
    return graphOzone, graphPM, graphCat
};

//$.get('/tbd.json', res => {makeBigData(res)});



new Chart($('#7-day-chart'), {
    type: 'bar',
    data: {
      labels: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],
      //from six_days
      datasets: [
        {
          label: 'Ozone AQI',
          ozoneData: [10, 36, 27, 12, 16, 32, 41],
          //from graphOzone
        },
        {
          label: 'PM 2.5 AQI',
          pmData: [5, 10, 7, 5, 8, 12, 15],
          //from graphPM
        },
      ],
    },
  });
  

  //class example: 
//$.get('/sales_this_week.json', res => {
    // In order to make this work, you need to use ISO-formatted date/time
    // strings. Check out the view function for `/sales_this_week.json` in
    // server.py to see an example.
  //const data = res.data.map(dailyTotal => ({x: dailyTotal.date, y: dailyTotal.melons_sold}));
  
//   new Chart($('#line-time'), {
//       type: 'line',
//       data: {
//         datasets: [
//           {
//             label: 'All Melons',
//             data,  // equivalent to data: data
//           },
//         ],
//       },
//       options: {
//         scales: {
//           x: {
//             type: 'time',
//             time: {
//               // Luxon format string
//               tooltipFormat: 'LLLL dd',
//               unit: 'day',
//             },
//           },
//         },
//       },
//     });
//   });


//previous function ideas: 
//function display_chart(table) {
    //$$user.profile.append(chart.table)
    //$$search.details.append(chart.table)
// //}
// function displayDetails(evt) {
//     evt.preventDefault();

//     function makeChart(six_days) {
//         console.log(six_days)
//     }

//     function makeGraph(six_days) {
//     }
//     function goToSearchDetails() {
//         //goes to that route
//     }
// }

// $('#show-button').on('click', displayDetails);
// move to initial search.js if need to call this button. 

//on click, make 7 day route
//and make chart
//on search details page