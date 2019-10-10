$(document).ready(function() {

    let category = $(".events-col").attr("data-category");
    console.log (category);

    let eventfulApiKey = "ZpK2fMNqsCw5JgDC";
    let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${eventfulApiKey}&q=halloween&c=${category}&l=phoenix&within=30&units=miles`;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
    });

})