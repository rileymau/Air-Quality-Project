//the initial 1 day and 7 day searches
//outputs url, json info
//setup routes later

//tbd make a chart.js

//get one berry name
$.get("https://pokeapi.co/api/v2/berry/1/", (result) => {console.log(result["item"]["name"])}); 
//item has name: cheri-beri

//loop from 1 to 20
//make url for that berry
//get request for berry name
//append name to berry list
//add name to section 5
for (let i = 1; i <= 20; i += 1) {
    //    console.log(i);
        let api = `https://pokeapi.co/api/v2/berry/${i}/`
        // data = item['name']; 
        $.get(api, (result) => {
         //   console.log(result["item"]["name"]); 
            let thing = result["item"]["name"]; 
       
            $('#berries').append(`<li>${thing.slice(0, -6)}</li>`);
        }) 
    }

    //didn't need
//const berryList = []; 
//console.log(berryList);
//   berryList.push(thing); 
//$('#berries').append(berryList); 

function replaceweather(response){
    $('#weather-info').html(response.forecast);
  }
  function showWeather(evt) {
    evt.preventDefault();
  
    const url = '/weather.json';
    const formData = {zipcode: $('#zipcode-field').val()};
  
    $.get(url, formData, replaceweather );
  }
  
  $('#weather-form').on('submit', showWeather);

function orderMelons(evt) {
  evt.preventDefault();
  const url = '/order-melons.json';
  const formData = {
    melon_type: $('#melon-type-field').val(),
    qty: $('#qty-field').val()
  };
  // keys at from of form data have to be keys in request.form.get in server.py. 
  $.post(url, formData, melon_info);
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}

$('#order-form').on('submit', orderMelons);