$(document).ready(function() {

//variables 
let date;
let event = [];
let location = [];
let results = [];

// store images of the events 
let images =[];
let eventLat =[];
let eventLong = [];

//eventbite api key link | function declaring for search of event 
 
function searchEventLocation (input){
    var queryURL =
    "https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=PUOXOWJBCOXJDZOEI4&redirect_uri=YOUR_REDIRECT_URI" +
    input;
  var apiURL = "https://proxy-cbc.herokuapp.com/proxy";

  $.ajax({
    url: apiURL,
    method: "POST",
    data: {
      url: queryURL
}










































































});