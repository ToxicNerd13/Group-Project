


function request(query) {
    this.query = query;
    this.fields = ["name", "geometry"];
}
function myMap(eventsLocs) {
    console.log(eventsLocs);
    let categoryMap = $(".map-container > div").attr("id");
    let tmpCenter = new google.maps.LatLng(0, 0);
    let bounds = new google.maps.LatLngBounds();
    let map = new google.maps.Map(document.getElementById(categoryMap), { center: tmpCenter, zoom: 12 });

    function createMarker(place) {
        let marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        let loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

        bounds.extend(loc);

        google.maps.event.addListener(marker, 'click', function () {
            let infowindow = new google.maps.InfoWindow();
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
        map.fitBounds(bounds);
        map.panToBounds(bounds);
    }
    function addressMarkers(addresses) {
        addresses.forEach(function (address) {
            let location = new request(address);
            let service = new google.maps.places.PlacesService(map);

            service.findPlaceFromQuery(location, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    createMarker(results[0]);
                }
            });
        });
    };


    addressMarkers(eventsLocs);
}