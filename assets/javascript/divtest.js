$(document).ready(function () {
    //let event;
    let category = $(".events-col").attr("data-category");
   
    let location = $(".city-search").attr("data-location")
  
    let eventfulApiKey = "ZpK2fMNqsCw5JgDC";
    let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${eventfulApiKey}&q=halloween&c=${category}&l=phoenix&within=30&units=miles&l=location&phoenix+arizona&date=future`;

    // onClick function 
    $('#sBtn').on("click", function (e) {
        e.preventDefault();
        console.log("Working")
        let cSearch = $(this).attr("dta-location")
        location = $(".city-search").val();

        $.ajax({
            url: queryUrl,
            method: "GET",
            dataType: 'json'
        }).done(function (response) {
           // console.log(response)
            var results = response;
            console.log(results.events.event);
        })

    });

});