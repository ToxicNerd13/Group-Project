$(document).ready(function () {
   //fright finder variables 
 var date = "";
  var event;
  var location;
  var inYourArea = [];
  var agePlus = [];
  var eventfulApiKey = `ZpK2fMNqsCw5JgDC`;

  // store images of the event 
  var images = [];
  
  
  function EventSearchLocation() {
    var queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${eventfulApiKey}&q=halloween&c=${location}&l=phoenix&within=30&units=miles`;

    //console.log(EventSearchLocation);
  }//.then(function(this) {
  //console.log(response);
});

// on click button for the search 
$(".btn").on("click", "#btn", function () {
  event.preventDefault();
  location = $(".city-search").val();
  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  var location;
  console.log(".city-search");
  })

  $(document).on("click", ".vertical-menu", function (event) {
    var location = $(".vertical-menu").val();
    var inYourArea;
    console.log("location");
  })

