'use strict';

//Create graph data from saved search and 6 new API calls.
//Create chart from graph data.
//only today is saved in searches db, any search can be turned into 7 days of data. 

//get search date, zipcode, and 6 day list from earch details html. split six days into array.
//six_days and today are both strings
const today = $('#search-date').text();
const zipcode = $('#search-zipcode').text();
const six_d = $('#six-day-list').text();
const six_days = six_d.split(',');
//console.log(six_days)
//console.log(today)


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
const graphDays = makeSevenDays(six_days, today);

  //pop last one on seven days before doing api CALLS. 
const APIDays = graphDays.slice(0,6);
console.log(APIDays);

const graphAQI = [0, 0, 0, 0, 0, 0];
const graphLabels = ["", "", "", "", "", ""];
const customColors = [];
let counter = 0;


for (const day of APIDays) {
  let index = APIDays.indexOf(day);
  //console.log(index);
  //console.log(day);
  //setTimeout(() => console.log('wait'), 10000)

  // because this function was appendind the aqi and label data in whatever order the api calls were completed, 
  // the data is now assigned to an index as it comes back. 
  $.get(`https://www.airnowapi.org/aq/observation/zipCode/historical/?format=application/json&zipCode=${zipcode}&date=${day}T00-0000&distance=1&API_KEY=65D54607-91C0-4049-93F6-04717AFA5B70`,
  (result) => { 
      console.log(result);
      console.log(result[0]['AQI']);
      graphAQI[index] = result[0]['AQI'];
      graphLabels[index] = result[0]['ParameterName'];
      counter += 1;
      console.log(graphAQI);
      if (counter === 6) {
        makeGraphData();
        makeTheChart();
      };
    }); 
};


  // Get search AQI value and label from search details page, add to graphAQI and graphLabels.
const searchOzone = $('#search-ozone').text();
console.log(searchOzone);

const searchPM = $('#search-pm').text();
console.log(searchPM);

function makeGraphData() {
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
    graphAQI.push(Number(searchAQI));
    graphLabels.push(searchLabel);
  }
  //if pm is None, define search ozone.  (searchPM === 'None')
  else {
    console.log("in else");
    searchLabel = 'OZONE';
    console.log(searchLabel);
    searchAQI = searchOzone;
    console.log(searchAQI)
    graphAQI.push(Number(searchAQI));
    graphLabels.push(searchLabel);
  };
  console.log(graphAQI);
  console.log(graphLabels);
};



  //pass graphDays, graphAQI, graphLabels to chart.  
  //Call chart after the 6 api calls run and after graph AQI list is complete with 7 items.
function makeTheChart() {
  console.log("getting to make the chart");
  function makeCustomColors() {
  //this function sets the bar colors depending on the value.  
  //this uses the same color scheme as the AirNow website.
    for (let i = 0; i < graphAQI.length; i += 1) {
      if (graphAQI[i] < 50) {
        customColors.push('#00e400')  //green
      };
      if (graphAQI[i] < 100 && graphAQI[i] >= 51) {
          customColors.push('#ffff00')  //yellow
      };
      if (graphAQI[i] < 150 && graphAQI[i] >= 101) {
          customColors.push('#ff7e00')  //orange
       };
      if (graphAQI[i] < 200 && graphAQI[i] >= 151) {
          customColors.push('r#ff0000')  //red
      };
      if (graphAQI[i] < 300 && graphAQI[i] >= 201) {
          customColors.push('#8f3f97')  //purple
      };
      if (graphAQI[i] < 500 && graphAQI[i] >= 301) {
          customColors.push('#7e0023')  //maroon
      };
    }; 
  };
  makeCustomColors();
  console.log(customColors);

  new Chart($('#7-day-chart'), {
    type: 'bar',
    data: {
      labels: graphDays,  
      datasets: [
        {
          label: 'Daily AQI',
          data: graphAQI,
          backgroundColor: customColors,  //'rgba(255, 100, 130, 0.5)',
          borderColor: 'rgba(81, 45, 168)',
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          displayColors: false,
          footerFont: {weight: 'normal'},
          callbacks: {
              footer: function(item) {
                let graphIndex = item[0].dataIndex;
                return 'Parameter: ' + graphLabels[graphIndex];
              }
          }
        }
      },
    },
  });
};
