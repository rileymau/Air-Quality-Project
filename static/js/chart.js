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
//}
function displayDetails(evt) {
    evt.preventDefault();
    function makeChart(six_days) {
        console.log(six_days)
    }

    function makeGraph(six_days) {
    }
    function goToSearchDetails {
        //calls that route
    }
}

$('#show-button').on('submit', displayDetails);
//on click, do make 7 day route
//and make chart
//on search details page