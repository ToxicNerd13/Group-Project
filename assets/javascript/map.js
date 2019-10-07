let map;
let service;
let infowindow;

function request(query) {
    this.query = query;
    this.fields = ["name", "geometry"];
}
function myMap() {
    let center = new request("Gilbert");
    let tmpCenter = new google.maps.LatLng(0, 0);

    map = new google.maps.Map(document.getElementById("map"), { center: tmpCenter, zoom: 12 });

    service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(center, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            map.setCenter(results[0].geometry.location);
        }
    });

    function createMarker(place) {
        let marker = new google.maps.Marker({
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
        let location = new request(address);
        service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(location, function (results, status) {
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

}