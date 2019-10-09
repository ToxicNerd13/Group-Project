$(document).ready(function () {
  // fright finder variables 
  var date = "";
  var event = [];
  var location = [];
  var inYourArea = [];
  var agePlus = [];
  var eventfulApiKey = `ZpK2fMNqsCw5JgDC`;

  // store images of the event 
  var images = [];
  var eventLat = [];
  var eventLong = [];

  // function declaring for search of the event 
  function EventSearchLocation() {
    var queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/image_sizes/start_time/stop_time/tz_id/search?app_key=${eventfulApiKey}&location=${location}&sort_order=popularity&date=this week`;

    $.ajax({
      url: queryUrl,
      method: "GET"

    })
    console.log(EventSearchLocation);
  };

  // on click button for the search 
  $(document).on("click", ".btn", function (event) {
    //event.preventDefault();
    event = $("#city-search").val();
    var location = [];
    var results = [];
    console.log("event");
  })

  $(document).on("click", ".vertical-menu", function (event) {
    //var location = $(".vertical-menu").val();
    var inYourArea = [];
    console.log("location");
  })
});