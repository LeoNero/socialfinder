var geocoder;
var map;
var places;
var markers = [];

function initialize(position) {
    geocoder = new google.maps.Geocoder();

    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var markerUser = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        title: "You are here!",
        icon: "http://maps.google.com/mapfiles/ms/icons/orange.png",
        map: map
    });

    markers.push(markerUser);

    addPlacesOnMap();
}

function getLocation() {
    if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(initialize);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function addPlacesOnMap() {
    var infowindow = new google.maps.InfoWindow({
        content: ''
    });

    $.ajax({
        url: '/data/places',
        dataType: 'json',
        success: function(response) {
            if (response.status == 'OK') {
                places = response.places;

                for (p in places) {
                    latLng_place = new google.maps.LatLng(places[p].geo[0], places[p].geo[1]);

                    var marker = new google.maps.Marker({
                        map: map,
                        position: latLng_place,
                        title : places[p].geo_name,
                        icon: "http://maps.google.com/mapfiles/ms/icons/green.png",
                    });

                    bindInfoWindow(marker, map, infowindow, "<b>" + places[p].description + "</b><br>" + places[p].geo_name);

                    markers.push(marker);
                }
            }
        }
    });
}

function bindInfoWindow(marker, map, infowindow, html) {
    google.maps.event.addListener(marker, 'click', function() {
	       infowindow.setContent(html);
	       infowindow.open(map, marker);
	});
}

google.maps.event.addDomListener(window, 'load', getLocation);
