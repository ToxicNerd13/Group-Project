$(document).ready(function(){
  
  
  
  var app = {
     
    database: undefined,
    databaseRef: undefined,
    userName: "",
    eventful:undefined,
    radius: 25,
    numResults: 12,
    numEventsPerRow: 6,
    startDate: undefined,
    stopDate: undefined,
    dateRange: undefined,
    eventfulAPIKey: "",
    eventArray: [],
    savedArray: [],
    savedKeys: [],
    savedEventIds: [],

    // eventful search function to get the specified number of results within the specified radius between the user input data range sorted by popularity
    searchEvents: function(){
      // eventful search URL
      var eventfulSearchURL = "https://api.eventful.com/json/events/search?app_key=ZpK2fMNqsCw5JgDC" + app.eventfulAPIKey + "&where=" + pos.lat + "%2C" + pos.lng + "&within=" + app.radius + "&page_size=" + app.numResults + "&date=" + app.dateRange + "&sort_order=popularity";
      // AJAX call to the Eventful API
      console.log(this.searchEvents);
      $.ajax({
        url: app.proxyURL + eventfulSearchURL,
        method: "GET",
        dataType: "json",
        crossDomain: true
      }).done(function (response) {
        // set the eventArray to the events within the response from the ajax call
        app.eventArray = response.events.event;
        // call the eventAppend function with the argument set to the eventArray
        app.eventAppend(app.eventArray);
      });
    },

    // function to append the events in the array argument to the DOM
    eventAppend: function(array){
      // empty the events div
      $("#events").empty();
      // create variable to keep track of the row number
      var rowNum = 0;
      // forEach statement to go through the array argument and build the event div and append them to the events div
      array.forEach(function(item, index){
        // determine if a new row needs to be created and create it if needed
        if (index % app.numEventsPerRow === 0){
          var rowDiv = $("<div>");
          rowDiv.addClass("row");
          rowNum = (index / app.numEventsPerRow) + 1;
          rowDiv.attr("id", "eventRow" + rowNum);
          $("#events").append(rowDiv);
        };
        // declare and set variables to the needed information from the array argument
        var image = item.image;
        var title = item.title;
        var placeURL = item.venue_url;
        var description = item.description;
        var eventStart = item.start_time;
        var start_time = moment(eventStart,'YYYY/MM/DD HH:ss:ss').format("M/DD h:mm a");
        var eventStop = item.stop_time;
        var stop_time = moment(eventStop,'YYYY/MM/DD HH:ss:ss').format("M/DD h:mm a");
        var endLat = item.latitude;
        var endLong = item.longitude;
        // variable to set the width of the div based on the bootstrap columns
        var numCols = Math.ceil(12 / app.numEventsPerRow);
        // variables building the various elements to hold the event information
        var totEventDiv = $("<div>").addClass("col-md-" + numCols + " eventCont");
        var eventDiv = $("<div>").addClass("location");
        var title_p = $("<p>").text(title);
        var eventStart_p = $("<p>").text("Start: " + start_time);
        var eventStop_p = $("<p>");
        // some of the events do not have an end date - this determines if "End" text is required
        if (item.stop_time != null){
          eventStop_p.text("End: " + stop_time);
        } else {
          eventStop_p.text("");
        };
        var eventImg = $("<img>");
        // the eventful event/search and event/get responses return the images differently - this points to the correct location in the response depending on the argument passed to the function
        // if no image urls are returned
        if (item.image === null || item.images === null){
          var eventImgURL = "assets/img/Placeholder.png"
        }
        else if (array === app.savedArray){
          // in addition to images differences, need to have remove buttons in the savedArray display to allow the user to remove events
          eventDiv.attr("id", app.savedKeys[index]);
          var remBtn = $("<button>");
          remBtn.attr("data-key", app.savedKeys[index]);
          remBtn.attr("class", "btn btn-default btn-sm remove")
          remBtn.text("Remove");
          // even the event/get response returns the images differently depending on if there is only one or if there are multiple
          if (item.images.image[0] === undefined){
            var eventImgURL = "https://" + item.images.image.medium.url.replace("http:", "").replace("https:", "").replace("//", "");
          } else {
            var eventImgURL = "https://" + item.images.image[0].medium.url.replace("http:", "").replace("https:", "").replace("//", "");
          };
        } else {
          var eventImgURL = "https://" + item.image.medium.url.replace("http:", "").replace("https:", "").replace("//", "");
        };
        // sets the required attributes onto the image and div elements
        eventImg.attr("src", eventImgURL);
        eventDiv.attr("data-eventID", item.id)
                .attr("data-loc", endLat + "," + endLong)
                .attr("data-target", "#myModal")
                .attr("data-toggle", "modal")
                .attr("data-title", title)
                .attr("data-start", eventStart)
                .attr("data-end", eventStop)
                .attr("data-url", placeURL)
                .attr("data-description", description);
        // builds the div to hold the event information
        eventDiv.append(eventImg, title_p, eventStart_p, eventStop_p);


  // on click event to read in the necessary user input
  $("#init-button").on("click", function(event){
    event.preventDefault();
    // obtains the name the user input
    app.userName = $("#name-input").val().trim();
    // sets the reference location from which to pull previously saved events and to push new saved events
    app.databaseRef = app.database.ref("/" + app.userName);
    // obtains the date range the user input
    app.startDate = moment($("#start-input").val(), "MM-DD-YYYY h:mm A").format("YYYYMMDD");
    app.stopDate = moment($("#stop-input").val(), "MM-DD-YYYY h:mm A").format("YYYYMMDD");
    // sets a global variable to the reference location (necessary because of scoping issue with the modal function)
    // savedEventsRef = app.databaseRef;
    // sets the dateRange based on what was (or was not) input into the date boxes
    if (app.startDate === "Invalid date" || app.stopDate === "Invalid date"){
      app.dateRange = "Future";
    } else {
      app.dateRange = app.startDate + "00-" + app.stopDate + "00";
    };
    // makes sure the user actually put something into the input boxes
    if (app.userName != ""){
      // calls the searchEvents function to get all the nearby events
      app.searchEvents();
      // calls the savedEvents function to determine the number of events that were previously saved under the name entered in the input box
      app.savedEvents();
    };
  });

  // click event to either display the events previously saved in the firebase database or to re-display the new events depending on the data-status attribute
  $("#savedEvents").on("click", function(){
    if ($(this).attr("data-status") === "saved"){
      // clears the savedKeys, savedArray, and savedEventIds to prevent duplicate data
      app.savedKeys = [];
      app.savedArray = [];
      app.savedEventIds = [];
      // builds the savedKeys array with the keys in the firebase database and sends the stored eventIds into the savedEventIds array
      app.databaseRef.on("child_added", function(shot){
        app.savedKeys.push(shot.key);
        app.savedEventIds.push(shot.val().eventID);
      });
      // sends each item in the savedEventIds array to the getEvents function to build the savedArray
      app.savedEventIds.forEach(function(element){
        app.getEvents(element);
      });
      // changes the Saved Events button to the Refresh button
      $(this).attr("data-status", "refresh");
      $(this).text("Refresh");
    } else {
      app.eventAppend(app.eventArray);
      app.savedEvents();
    };
  });

  $("#about-button").on("click", function() {
    var newP = $("<p>").text("Event Locator was created to show you upcoming events near your location.  Select a date-range to see events within a 25-mile radius. Then click on a picture to see more information such as times, venue location, venue website, map with  driving directions from your current location to the event, and current driving times. Add your name and you can save you own events for later viewing.");
    newP.addClass("text-center")
        .addClass("new-p");
    $(".about").append(newP);
    // ID and append
    $("#about-button").fadeOut("slow");
  });
 
});

// global variable needed by the eventful functions
var pos = {};
// global variables need by the google maps functions
var savedEventsRef;
var map;
var infoWindow;

// Google Maps initialization
function initMap() {
  let map;
        let service;
        let infoWindow;
        let marker;
        let city = {
            query: 'Gilbert Arizona',
            fields: ['name', 'geometry'],
        };
        function myMap() {
            let tmpCenter = new google.maps.LatLng(0, 0);
            map = new google.maps.Map(document.getElementById('map'), { center: tmpCenter, zoom: 12 });
            service = new google.maps.places.PlacesService(map);
            service.findPlaceFromQuery(city, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                }
            });
            function createMarker(place) {
                marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow = new google.maps.InfoWindow();
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
            }
            function addressMarker(address) {
                let request = {
                    query: address,
                    fields: ['name', 'geometry'],
                };
                service = new google.maps.places.PlacesService(map);
                service.findPlaceFromQuery(request, function (results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        createMarker(results[0]);
                    }
                });
            }
            addressMarker("1275 E Baseline Rd #107");
            addressMarker("92 West Vaughn Avenue, Gilbert, AZ");
            addressMarker("745 N Gilbert Rd #110");
            addressMarker("1550 N Stonehenge Dr #102");
            addressMarker("240 N Sunway Dr #102");
            
        };


      // On click event that updates the modal with the event specific attributes
      $(document).on("click", ".location", function() {
        // When modal shows..
        $('#myModal').modal('show');
        // Directions request
        var request = {
          destination: $(this).attr("data-loc"),
          origin: pos,
          travelMode: 'DRIVING'
        };
        // Adds the data attributes of the specific event
        var modalEventId = $(this).data("eventid");
        var modalTitle = $(this).data("title");
        var modalURL = $(this).data("url");
        var modalStart =  $(this).data("start");
        var modalEnd = $(this).data("end");
        var modalDescription = $(this).data("description");
        var latLong = $(this).data("data-loc");
          
        // Function to properly resize Google Maps when the modal loads
        $("#myModal").on("shown.bs.modal", function(e) {
          
          google.maps.event.trigger(map, "resize");
          // Centers the map on the users location
          map.setCenter(pos);
          // Sets zoom upon locating the user
          map.setZoom(10);
          // Sets red dot marker position
          var marker = new google.maps.Marker({
            position: pos,
            map: map
          });

          // Adding the title to the modal 
          $("#modal-label").data("eventid", modalEventId).text(modalTitle);

          // When clicking on the map, run the maps URL function
          $("#map").on("click", function() {
            // Variable adding the Maps URL and the users lat and long plus the destinations lat and long
            var googleURL = "https://www.google.com/maps/dir/?api=1&origin=" + pos.lat + "," + pos.lng + "&destination=" + request.destination;
            // When clicking the map - Display the directions in the cross platform URL - Opens either Google Maps App on phone
            // Or opens it in the web browser - creating step by step GPS based driving directions
            // See googles documentation on Maps URL for types of platform support
            window.location.href=googleURL;
          });

         
          

          // Adding the start and end times
          var timeStart = moment(modalStart,'YYYY/MM/DD HH:ss:ss').format("dddd, MMMM Do YYYY, h:mm a");
          var timeEnd = moment(modalEnd,'YYYY/MM/DD HH:ss:ss').format("dddd, MMMM Do YYYY, h:mm a");

          // If there is no event end time
          if(timeEnd === "Invalid date") {
            $("#time").html(timeStart + " - " + " Until");
          } else if(timeStart === "Invalid date") {
            $("#time").html(timeStart + " - " + " Anytime");
            // If there is no event start time
            $("#time").html(timeStart + " - " + timeEnd)
          } else {
            // Adding the time to the DOM
            $("#time").html(timeStart + " - " + timeEnd)
          };
          
          // Venue website link
          $("#button-url").text("Venue Website");
          $("#button-url").click(function(){
            window.location.href=modalURL;
          });

          // Venue description
          if (modalDescription === undefined) {
            $("#info").text("");
          } else {
            $("#info").text(modalDescription);
          };
        });

        // Pass the directions request to the directions service
        directionsService.route(request, function(response, status) {
          if (status == 'OK') {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
          }
        });
      });
     
    }
