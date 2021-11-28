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

  //pop last one on seven days before doing api CALLS. 
const APIDaysC = graphDaysC.slice(0,6);
console.log(APIDaysC);

const graphAQIC = [];
const graphLabelsC = [];
const customColorsC = [];


for (const day of APIDaysC) {

  $.get(`https://www.airnowapi.org/aq/observation/zipCode/historical/?format=application/json&zipCode=${zipcode}&date=${day}T00-0000&distance=1&API_KEY=65D54607-91C0-4049-93F6-04717AFA5B70`,
  (result) => { 
    console.log(result);
    console.log(result[0]['AQI']);
    graphAQIC.push(result[0]['AQI']);
    graphLabelsC.push(result[0]['ParameterName']);
    if (graphAQIC.length === 6) {
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



  

  

  // Specific Date Chart functions %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

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

  new Chart($('#spec-date-chart'), {
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


//Customize 7 day chart with new date added. 

function addData(evt) {
  evt.preventDefault();

  console.log("in add data");
  const dateToAdd = $('#custom-date').val();

  $.get(`https://www.airnowapi.org/aq/observation/zipCode/historical/?format=application/json&zipCode=${zipcode}&date=${dateToAdd}T00-0000&distance=1&API_KEY=65D54607-91C0-4049-93F6-04717AFA5B70`,
  (result) => { 
    console.log(result);
    console.log(result[0]['AQI']);
    graphAQIC.push(result[0]['AQI']);
    graphLabelsC.push(result[0]['ParameterName']);
    if (graphAQIC.length === 6) {
      makeGraphDataC();
      makeSpecDateChart();
    };
  }); 
};

// Needs to be added to make data in right order: 
// (result) => { 
//   console.log(result);
//   console.log(result[0]['AQI']);
//   // graphAQIR.push(result[0]['AQI']);
//   // graphLabelsR.push(result[0]['ParameterName']);
//   graphAQIR[index] = result[0]['AQI'];
//   graphLabelsR[index] = result[0]['ParameterName'];
//   counterR += 1;
//   console.log(graphAQIR);
//   if (counterR === 6) {
//   //if (graphAQI.length === 6) {
//     makeGraphDataR();
//     makeTheChartR();
//   };
// }); 
// };


  //add date form button on submit... run the add function. 

//on clicking submit, the functions above run
$('#date-form').on('submit', addData);


  // Zipcode chart functions %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


  
function makeAllZipChart(result) {
    //make the graph with big list ofsearches, and their AQI data and dates.
    const data = result.data.map(zipcodedata => ({x: zipcodedata.date, y: zipcodedata.AQI})); 
      //z: zipcodedata.labels}));
      //loop result.data each item
    console.log("in js zipcode")

    new Chart($('#zipcode-chart'), {
        type: 'bar',
        data: {
          datasets: [
            {
              label: 'AQI',
              data, //AQIs.values,
            },
          ],
        },
        options: {},
      });
};
//add color info later.

$.get('/allzipsearch.json', {"zipcode": zipcode}, result => {makeAllZipChart(result)})

// tried `${zipcode}`


  


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