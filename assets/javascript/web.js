$(document).ready(function() {

//variables 
let  date;
let event = [];
let location = [];
let results = [];

// store images of the events 
let images =[];
let eventLat =[];
let eventLong = [];

function searchEventTpe(input){
     //QueryURL using user search input as a parameter
  var queryURL =
  "" +
  input;
var apiURL = "";

$.ajax({
  url: apiURL,
  method: "POST",
  data: {
    url: queryURL
  }


}, function(res){
    
})
}

})