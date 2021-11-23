'use strict';

//Create graph data from saved search and 6 new API calls.
//Create chart from graph data.
//only today is saved in searches db, any search can be turned into 7 days. 

//get search date, zipcode, and 6 day list from earch details html. split six days into array.
const today = $('#search-date').text();
const zipcode = $('#search-zipcode').text();
const six_d = $('#six-day-list').text();
const six_days = six_d.split(',');

//console.log(six_days)
//console.log(today)
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
const APIDays = graphDays.slice(0,6);
console.log(APIDays);

const graphAQI = [];
const graphLabels = []
//const dayCount = graphAQI.length;

//function makeGraphData() {
for (const day of APIDays) {
  //console.log(day);
  //setTimeout(() => console.log('wait'), 10000)

  $.get(`https://www.airnowapi.org/aq/observation/zipCode/historical/?format=application/json&zipCode=${zipcode}&date=${day}T00-0000&distance=1&API_KEY=65D54607-91C0-4049-93F6-04717AFA5B70`,
  (result) => { 
      //splitResult = result.split(',');
      console.log(result);
      console.log(result[0]['AQI']);
      graphAQI.push(result[0]['AQI']);
      graphLabels.push(result[0]['ParameterName']);
      //graphOzone.push([result[0]['Ozone']]);
      //graphPM.push(result[0]['PM2.5']);
    }); 
  };
    //finishGraphData(dayCount);

  // Get search AQI value and label from search details page, add to graphAQI and graphLabels.
 

//let searchAQI = 0;
//let searchLabel = "";
const searchOzone = $('#search-ozone').text();
console.log(searchOzone);

const searchPM = $('#search-pm').text();
console.log(searchPM);

function makeGraphData() {
  //if ozone is None, define search pm.
  if (searchOzone === 'None') {
    console.log("in ozone None");
    const searchLabel = 'PM2.5';
    console.log(searchLabel);
    const searchAQI = searchPM;
    console.log(searchAQI)
  }
  //if pm is None, define search ozone.  (searchPM === 'None')
  else {
    console.log("in else");
    const searchLabel = 'OZONE';
    console.log(searchLabel);
    const searchAQI = searchOzone;
    console.log(searchAQI)
  };
};
//console.log(searchAQI);
//console.log(searchLabel);
 // Set length requirement so that JS doesn't add the searchAQI and searchLabel before the API calls all run. 

//function finishGraphData(dayCount) { HERE.
//if (dayCount === 6) {
if (graphAQI.length === 6) {
    graphAQI.push(searchAQI);
    graphLabels.push(searchLabel);
    console.log(graphAQI);
    console.log(graphLabels); 
  };
//};

makeGraphData();

//}

  //pass graphDays, graphAQI, graphLabels to chart

new Chart($('#7-day-chart'), {
    type: 'bar',
    data: {
      labels: graphDays,  
      datasets: [
        {
          label: 'AQI',
          data: graphAQI
        },
      ],
    },
  });
  //add barcode colors acording to AQI category.
  



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

//previous data dictionary idea: 
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