//extended yearlong search functions

//get all dates (and six_days?) for each search
//get six day and main search date from html or chart.js
//make graph of those dates.
//add a trendline if possible. 
// can do list(set(list of dates)). 

//Customized functions for date adding are called "custom" or ...C.


//get search date, zipcode, and 6 day list from earch details html. split six days into array.
//six_days and today are both strings
const today = $('#search-date').text();
const zipcode = $('#search-zipcode').text();
const six_d = $('#six-day-list').text();
const six_days = six_d.split(',');


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

//make master list of six previous days plus current search day.
const graphDaysC = makeSevenDays(six_days, today);

  //pop last one on seven days before doing api calls. Search data can be added later for day 7.
const APIDaysC = graphDaysC.slice(0,6);
console.log(APIDaysC);


 // Functions to make first chart before dates are added.  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const graphAQIC = [0, 0, 0, 0, 0, 0];
const graphLabelsC = ["", "", "", "", "", ""];
const customColorsC = [];
let counterC = 0;

for (const day of APIDaysC) {
  let index = APIDaysC.indexOf(day);

  // This was adjusted to assign data to index of day as it comes in from API. 
  // After this function, graphAQIC and graphLabels just have 6 values each. 
  $.get(`https://www.airnowapi.org/aq/observation/zipCode/historical/?format=application/json&zipCode=${zipcode}&date=${day}T00-0000&distance=1&API_KEY=65D54607-91C0-4049-93F6-04717AFA5B70`,
  (result) => { 
    console.log(result);
    console.log(result[0]['AQI']);
    graphAQIC[index] = result[0]['AQI'];
    graphLabelsC[index] = result[0]['ParameterName'];
    counterC += 1;
    if (counterC === 6) {
      makeGraphDataC();
      makeSpecDateChart();
    };
  }); 
};

      // Get search AQI value and label from search details page, add to graphAQI and graphLabels.
const searchOzone = $('#search-ozone').text();
console.log(searchOzone);

const searchPM = $('#search-pm').text();
console.log(searchPM);

function makeGraphDataC() {
  //with search label and AQI value, add to graphAQI and graphLabels lists, as 7th items.
  //if ozone is None, define search pm.
  let searchLabel;
  let searchAQI;
  if (searchOzone === 'None') {
    console.log("in ozone None");
    searchLabel = 'PM2.5';
    console.log(searchLabel);
    searchAQI = searchPM;
    console.log(searchAQI)
    graphAQIC.push(Number(searchAQI));
    graphLabelsC.push(searchLabel);
  }
    //if pm is None, define search ozone.  (searchPM === 'None')
  else {
    console.log("in else");
    searchLabel = 'OZONE';
    console.log(searchLabel);
    searchAQI = searchOzone;
    console.log(searchAQI)
    graphAQIC.push(Number(searchAQI));
    graphLabelsC.push(searchLabel);
  };
  console.log(graphAQIC);
  console.log(graphLabelsC);
    // return {searchLabel: searchLabel,
    //   searchAQI: searchAQI};
};


  //make the graph the current search and a previous date. Start with current 7 day chart. 
  //pass graphDays, graphAQI, graphLabels to chart.  
  //Call chart after the 6 api calls run and after graph AQI list is complete with 7 items.
function makeSpecDateChart() {
  function makeCustomColorsC() {
  //this function sets the bar colors depending on the value.  
  //this uses the same color scheme as the AirNow website.
    for (let i = 0; i < graphAQIC.length; i += 1) {
      if (graphAQIC[i] < 50) {
        customColorsC.push('green')
      };
      if (graphAQIC[i] < 100 && graphAQIC[i] >= 51) {
          customColorsC.push('yellow')
      };
      if (graphAQIC[i] < 150 && graphAQIC[i] >= 101) {
          customColorsC.push('orange')
       };
      if (graphAQIC[i] < 200 && graphAQIC[i] >= 151) {
          customColorsC.push('red')
      };
      if (graphAQIC[i] < 300 && graphAQIC[i] >= 201) {
          customColorsC.push('purple')
      };
      if (graphAQIC[i] < 300 && graphAQIC[i] >= 201) {
        customColorsC.push('purple')
      };
      if (graphAQIC[i] < 500 && graphAQIC[i] >= 301) {
        customColorsC.push('maroon')
      };
    }; 
  };

  makeCustomColorsC();
  console.log(customColorsC);

  customChart = new Chart($('#spec-date-chart'), {
    type: 'bar',
    data: {
      labels: graphDaysC,  
      datasets: [
        {
          label: 'Daily AQI',
          data: graphAQIC,
          backgroundColor: customColorsC,  //'rgba(255, 100, 130, 0.5)',
          borderColor: 'rgba(255, 100, 130)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      datasets: {
        bar: {
        },
        
      },
    },
  });
};

  // Specific Date Chart functions %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// function makeClickData() {

//   return clickData;
// };


//Customize 7 day chart with new date added. 

function addData(evt) {
  evt.preventDefault();

  console.log("in add data");
  const dateToAdd = $('#custom-date').val();


  //Make click chart data from graphDays, graphAQI lists.
  // let clickData = [];
  // for (const day of graphDaysC) {
  //   index = graphDaysC.indexOf(day);
  //   clickData.push({'date': day, 'AQI': graphAQIC[index]});
  // };
  // console.log(clickData); 

  //get the new day's AQI, append date and AQI to clickData.  Run dateToAdd through some comparisons to see where to add in graphAQIC, graphDaysC.
  $.get(`https://www.airnowapi.org/aq/observation/zipCode/historical/?format=application/json&zipCode=${zipcode}&date=${dateToAdd}T00-0000&distance=1&API_KEY=65D54607-91C0-4049-93F6-04717AFA5B70`,
  (result) => { 
    console.log(result);
    console.log(result[0]['AQI']);

    //if dateToAdd > last day in graphDaysC:
    if (dateToAdd > graphDaysC[6]) {
      graphAQIC.push(result[0]['AQI']); 
      graphDaysC.push(dateToAdd);
      console.log(graphDaysC);
      console.log(graphAQIC);
    }

    //if dateToAdd < first day in graphDaysC:
    else if (dateToAdd < graphDaysC[6]) {
      graphAQIC.unshift(result[0]['AQI']); 
      graphDaysC.unshift(dateToAdd);
      console.log(graphDaysC);
      console.log(graphAQIC);
    }

    else {
      //compare date to each item in graphDaysC
      //find its place
      //scoot all others down an index
      //add it in graph days
      //get that index
      //scoot all down in graphAQIC
      //add AQI in at that index
      console.log(graphDaysC);
      console.log(graphAQIC);
    }



    //clickData.push({'date': `${dateToAdd}`, 'AQI': result[0]['AQI']});
    //console.log("sorted", clickData);

    //remake aqi, data list. 
    // for (const dict in clickData) {
    //   graphAQIC.push(dict.AQI);
    //   graphDaysC.push(dict.date);
    // }

    //the old chart on the canvas has to be destroyed before printing the updated chart.
    customChart.destroy();
    makeSpecDateChart();
  });
}; 

//on clicking submit, the functions above run to add date to chart.
$('#date-form').on('submit', addData);


  // Zipcode chart functions %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% (below this all works.)
  
function makeAllZipChart(result) {
    //make the graph with big list of searches, and their AQI data and dates.
    //this maps the list of dictionaries to the x, y data pairs. 
    const data = result.data.map(zipcodedata => ({x: zipcodedata.date, y: zipcodedata.AQI})); 
      //z: zipcodedata.labels}));
      //loop result.data each item
    console.log("in js zipcode");
    console.log(data);
    console.log(data[0].y);

    const zipColors = [];

    function makeColorsFromMap(value) {
      //this function sets the bar colors depending on the value.  
      //this uses the same color scheme as the AirNow website.
      
        if (value < 50) {
          zipColors.push('green')
            };
        if (value < 100 && value >= 51) {
          zipColors.push('yellow')
            };
        if (value < 150 && value >= 101) {
          zipColors.push('orange')
            };
        if (value < 200 && value >= 151) {
          zipColors.push('red')
            };
        if (value < 300 && value >= 201) {
          zipColors.push('purple')
            };
        if (value < 300 && value >= 201) {
          zipColors.push('purple')
            };
        if (value < 500 && value >= 301) {
          zipColors.push('maroon')
            };
      };

    // loop zipcode data to get color list (zipColors) for chart.
    for (let i = 0; i < data.length; i += 1) {
      let value = data[i].y;
      console.log(value);
      makeColorsFromMap(value);
    }
    
    console.log(zipColors);

    new Chart($('#zipcode-chart'), {
        type: 'bar',
        data: {
          datasets: [
            {
              label: 'AQI',
              data, 
              backgroundColor: zipColors,  //'rgba(255, 100, 130, 0.5)',
              borderColor: 'rgba(255, 100, 130)',
              borderWidth: 1,
            },
          ],
        },
        options: {},
      });
};

  //giit zipcode data from server route/crud function. comes back jsonified.
$.get('/allzipsearch.json', {"zipcode": zipcode}, result => {makeAllZipChart(result)})

// double checked, zipcode chart is showing correct values from allzipsearch list:
//[{'date': '2021-11-15', 'AQI': 27}, {'date': '2021-11-16', 'AQI': 38}, {'date': '2021-11-18', 'AQI': 22}, 
//{'date': '2021-11-19', 'AQI': 17}, {'date': '2021-11-22', 'AQI': 23}, {'date': '2021-11-24', 'AQI': 46}]
//Chart shows: 27, 38, 22, 17, 23, 46. 


//Note, sometimes the saved search data for a zipcode and day is diiffernt from that date pulled up in
//the six days previous of another search.  The six day previous function takes data at midnight on each day,
//and the new search function takes it at the current time.
  

// other function/chart ideas: 
// function makePrevWeekChart(result) {
//   //make the graph with the current search, last 6 days, and previous week.
//   new Chart($('#prev-week-chart'), {
//       type: 'bar',
//       data: {
//         labels: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],
//         datasets: [
//           {
//             label: 'AQI',
//             data: [10, 36, 27, 12, 16, 32, 41],
//           },
//         ],
//       },
//     });
// };


//Unused: 
//function makeMonthlyChart(result) {
//   //make the graph with current search date, and first day of month for the last year.

//   new Chart($('#monthly-chart'), {
//       type: 'bar',
//       data: {
//         labels: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],
//         datasets: [
//           {
//             label: 'AQI',
//             data: [10, 36, 27, 12, 16, 32, 41],
//           },
//         ],
//       },
//     });
// };

// $.get('/allzipsearch', result => {makeMonthlyChart(result)})