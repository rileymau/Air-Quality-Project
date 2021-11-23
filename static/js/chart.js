'use strict';

//Create graph data from saved search and 6 new API calls.
//Create chart from graph data.
//only today is saved in searches db, any search can be turned into 7 days. 

//get search date, zipcode, and 6 day list from html. split six days into array.
const today = $('#search-date').text();
const zipcode = $('#search-zipcode').text();
const six_d = $('#six-day-list').text();
const six_days = six_d.split(',');
let text = "How are you doing today?";
const myArray = text.split(" ");
console.log(myArray);

console.log(six_days)
console.log(today)
//get 6 days of dates from search details page. 

//six_days and today are both strings
//fill in date, pm and ozone from search already done. 

//make 7 day list for graph key. 
//the string in six_days comes with spaces and returns, only use last 10 chars to get date. 
//Also need to remove last item from six_days. 
function makeSevenDays(stringList, string) {
  const seven_days = [];
  for (const day of stringList) {
    seven_days.push(day.slice(-10));
  };
  seven_days.pop(-1)
  seven_days.push(string);
  console.log(seven_days);
  return(seven_days)
};

const graphDays = makeSevenDays(six_days, today);

//pop last one on seven days before doing api CALLS. 
const APIDays = graphDays.slice(7);

const graphOzone = [];
const graphPM = [];

for (const day in APIDays) {

  $.get("https://aq/observation/zipCode/historical ...${day} ..${zipcode}.", (result) => {   //here2
      console.log(result);
      graphOzone.push([result[0]['Ozone']]);
      graphPM.push(result[0]['PM2.5']);
    }); 
  };

  const searchOzone = 5
  const searchPM = 6

  graphOzone.push(searchOzone);
  graphPM.push(searchPM);

  //pass graphDays, graphOzone, graphPM to chart

new Chart($('#7-day-chart'), {
    type: 'bar',
    data: {
      labels: graphDays,  
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


      //data['Ozone AQI'] = result[0]['Ozone'];
      //data['PM2.5 AQI'] = result[0]['PM2.5'];

        // function makeGraphData(result) {
        //     data['Ozone AQI'] = result[0]['Ozone'];
        //     data['PM2.5 AQI'] = result[0]['PM2.5'];
        //     data['Category'] = result[0]['Category']['Number'];
        //     return data
        // };

        // function storeGraphData(data) {

        //     graphOzone.push.data['Ozone AQI'];
        //     graphPM.push.data['PM2.5 AQI'];
        //     graphCat.push.data['Category'];
        // };