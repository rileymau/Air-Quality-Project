'use strict';

    //get search date
const today = $('#search-date').text();
//send to server.py with separate post req if needed, 

//get 6 days of dates from search details page. 
//make chart of 7 dates. 
//fill in date, pm and ozone from search already done. 


//for day in six_days...
    //url historical - ajax with new date
    //and search.zipcode
    //pass date, pm, ozone to chart

    //only today is saved in searches db, any search can be turned into 7 days. 


    //for 7 day search
//data before today's: 
//$.get("https://aq/observation/zipCode/historical...", (result) => {console.log(result)}); 


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


new Chart($('#7-day-chart'), {
    type: 'bar',
    data: {
      labels: ['Watermelon', 'Cantaloupe', 'Honeydew'],
      datasets: [
        {
          label: 'Today',
          data: [10, 36, 27],
        },
        {
          label: 'Yesterday',
          data: [5, 10, 7],
        },
      ],
    },
  });

$.get('/sales_this_week.json', res => {
    // In order to make this work, you need to use ISO-formatted date/time
    // strings. Check out the view function for `/sales_this_week.json` in
    // server.py to see an example.
  const data = res.data.map(dailyTotal => ({x: dailyTotal.date, y: dailyTotal.melons_sold}));
  
  new Chart($('#line-time'), {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'All Melons',
            data,  // equivalent to data: data
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              // Luxon format string
              tooltipFormat: 'LLLL dd',
              unit: 'day',
            },
          },
        },
      },
    });
  });