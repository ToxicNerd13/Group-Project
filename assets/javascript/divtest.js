$(document).ready(function () {

    let category = $(".events-col").attr("data-category");
    console.log(category);

    let eventfulApiKey = "ZpK2fMNqsCw5JgDC";
    let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${eventfulApiKey}&q=halloween&c=${category}&l=phoenix&within=30&units=miles`;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {
        
            let results = JSON.parse(response);
            console.log(results);

            for (let i = 0; i < 10; i++) {
                //let addressData = results.events.event[i].venue_address;
                //console.log(addressData);
                //eventsLocs.push(addressData);
                //console.log(eventsLocs);

                let eventDiv = $("<div>").attr("class", "event-div");
                let eventTitle = $("<h3>").text(results.events.event[i].title);

                eventDiv.append(eventTitle);
                $(".events-col").append(eventDiv);
            };
        });

});