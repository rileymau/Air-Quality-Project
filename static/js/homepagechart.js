'use strict';

//Most of this page is copies from chart.js with a few changes (for recent search).
//Customized functions for recent search data are called "recent" or ...R.

//Create graph data from saved search and 6 new API calls.
//Create chart from graph data.
//only today is saved in searches db, any search can be turned into 7 days of data. 

//get search date, zipcode, and 6 day list from earch details html. split six days into array.
//six_days and today are both strings
const todayR = $('#recent-date').text();
const zipcodeR = $('#recent-zipcode').text();
const six_dR = $('#six-day-recent-list').text();
const six_daysR = six_dR.split(',');


//make 7 day list for graph key. 
//the string in six_days comes with spaces and returns, only use last 10 chars to get date. 
//Also need to remove last item from six_days. 
function makeSevenDaysR(stringList, string) {
  const seven_daysR = [];
  for (const day of stringList) {
    seven_daysR.push(day.slice(-10));
  };
  seven_daysR.pop(-1)
  seven_daysR.push(string);
  console.log(seven_daysR);
  return(seven_daysR)
};

//make master list of six previous days plus current search day.
const graphDaysR = makeSevenDaysR(six_daysR, todayR);


  //pop last one on seven days before doing api CALLS. 
const APIDaysR = graphDaysR.slice(0,6);
console.log(APIDaysR);
  
const graphAQIR = [0, 0, 0, 0, 0, 0];
const graphLabelsR = ["", "", "", "", "", ""];
const customColorsR = [];
let counterR = 0;


for (const day of APIDaysR) {
    let index = APIDaysR.indexOf(day);
    //console.log(day);
    //setTimeout(() => console.log('wait'), 10000)
  
    // This was adjusted to assign data to index of day as it comes in from API. 
    $.get(`https://www.airnowapi.org/aq/observation/zipCode/historical/?format=application/json&zipCode=${zipcodeR}&date=${day}T00-0000&distance=1&API_KEY=65D54607-91C0-4049-93F6-04717AFA5B70`,
    (result) => { 
        console.log(result);
        console.log(result[0]['AQI']);
        graphAQIR[index] = result[0]['AQI'];
        graphLabelsR[index] = result[0]['ParameterName'];
        counterR += 1;
        console.log(graphAQIR);
        if (counterR === 6) {
          makeGraphDataR();
          makeTheChartR();
        };
      }); 
  };


    // Get search AQI value and label from search details page, add to graphAQI and graphLabels.
const searchOzoneR = $('#recent-ozone').text();
console.log(searchOzoneR);

const searchPMR = $('#recent-pm').text();
console.log(searchPMR);

function makeGraphDataR() {
  //with search label and AQI value, add to graphAQI and graphLabels lists, as 7th items.
  //if ozone is None, define search pm.
  let searchLabelR;
  let searchAQIR;
  if (searchOzoneR === 'None') {
    console.log("in ozone None Recent");
    searchLabelR = 'PM2.5';
    console.log(searchLabelR);
    searchAQIR = searchPMR;
    console.log(searchAQIR)
    graphAQIR.push(Number(searchAQIR));
    graphLabelsR.push(searchLabelR);
  }
    //if pm is None, define search ozone.  (searchPM === 'None')
    else {
      console.log("in else Recent");
      searchLabelR = 'OZONE';
      console.log(searchLabelR);
      searchAQIR = searchOzoneR;
      console.log(searchAQIR)
      graphAQIR.push(Number(searchAQIR));
      graphLabelsR.push(searchLabelR);
    };
    console.log(graphAQIR);
    console.log(graphLabelsR);
  };

  //pass graphDays, graphAQI, graphLabels to chart.  
  //Call chart after the 6 api calls run and after graph AQI list is complete with 7 items.
  function makeTheChartR() {
    function makeCustomColorsR() {
    //this function sets the bar colors depending on the value.  
    //this uses the same color scheme as the AirNow website.
      for (let i = 0; i < graphAQIR.length; i += 1) {
        if (graphAQIR[i] < 50) {
          customColorsR.push('#00e400')  //green
        };
        if (graphAQIR[i] < 100 && graphAQIR[i] >= 51) {
            customColorsR.push('#ffff00')  //yellow
        };
        if (graphAQIR[i] < 150 && graphAQIR[i] >= 101) {
            customColorsR.push('#ff7e00')  //orange
         };
        if (graphAQIR[i] < 200 && graphAQIR[i] >= 151) {
            customColorsR.push('r#ff0000')  //red
        };
        if (graphAQIR[i] < 300 && graphAQIR[i] >= 201) {
            customColorsR.push('#8f3f97')  //purple
        };
        if (graphAQIR[i] < 500 && graphAQIR[i] >= 301) {
             customColorsR.push('#7e0023')  //maroon
        };
      }; 
    };
    makeCustomColorsR();
    console.log(customColorsR);
    
    new Chart($('#most-recent-chart'), {
        type: 'bar',
        data: {
          labels: graphDaysR,
          datasets: [
            {
              label: 'Daily AQI',
              data: graphAQIR,
              backgroundColor: customColorsR,  //'rgba(255, 100, 130, 0.5)',
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
                    return 'Parameter: ' + graphLabelsR[graphIndex];
                  }
              }
            }
          },
        },
      });
    }
