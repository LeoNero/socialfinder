function success(position) {
    var latitudeUser = position.coords.latitude;
    var longitudeUser = position.coords.longitude;

    var latlng = new google.maps.LatLng(latitudeUser, longitudeUser);

    var mapOptions = {
        zoom: 14,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var markerUser = new google.maps.Marker({
        position: latlng,
        title: "You are here!",
        icon: "http://maps.google.com/mapfiles/ms/icons/orange.png",
        map: map
    });
}

function getLocation() {
    if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(success);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
