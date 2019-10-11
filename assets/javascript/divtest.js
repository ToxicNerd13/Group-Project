// var eventsLocs = [];

$(document).ready(function () {

    //let event;
    let category = $(".events-col").attr("data-category");
   
    let location = $(".city-search").attr("data-location")
  
    let eventfulApiKey = "ZpK2fMNqsCw5JgDC";
    let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${eventfulApiKey}&q=halloween&c=${category}&l=phoenix&within=30&units=miles&l=location&phoenix+arizona&date=future`;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {

            let results = JSON.parse(response);
            console.log(results);

            let eventsLocs = [];
            for (let i = 0; i < results.events.event.length; i++) {

                eventsLocs.push(results.events.event[i].venue_address);

                let eventDiv = $("<div>").attr("class", "event-div");
                let eventTitle = $("<h3>").text(results.events.event[i].title);

                eventDiv.append(eventTitle);
                $(".events-col").append(eventDiv);
            };
            console.log(eventsLocs);
            myMap(eventsLocs);
        });

        $('#sBtn').on("click", function (e) {
            let eventfulApiKey = "ZpK2fMNqsCw5JgDC";
            let location = $("#city-search").val();
            let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${eventfulApiKey}&q=halloween&l=${location}&within=30&units=miles`;
            e.preventDefault();
            console.log("Working")
            $.ajax({
                url: queryUrl,
                method: "GET",
                dataType: 'json'
            }).done(function (response) {
               // console.log(response)
                var results = response;
                console.log(results.events.event);
            });
        });
})