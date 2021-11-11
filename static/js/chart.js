'use strict';

//for extended serch functions:
    // if date === today
    //     const date= datetiime.now()
    // if date === week

    //get search date
const today = $('#search-date').text();
const sevenDays = [];
console.log('here');

function make_seven_days(today) {
    //using search date, list last six days too. 
    //redo whole function.  get year, month, day, and subtract days.  need to change month too though. 
    for (const num in [-6, -5, -4, -3, -2, -1]) {
        mult = (num * 1000 *3600 *24);
        date = today + mult;
        sevenDays.push(date);
    };
    console.log(sevenDays);
    return sevenDays;
}

make_seven_days(today);

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