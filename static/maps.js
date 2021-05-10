var map;
var infoWindow;
var clusters;
var svgMarker;
function initMap(callback) {
    const city = { lat: 46.253, lng: 20.14824 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: city,
        mapId: "7dffb7ad9170c9ae",
        streetViewControl: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        rotateControl: true,
        fullscreenControl: false
    });
    infoWindow = new google.maps.InfoWindow();
    svgMarker = {
        path: "M 0,0 m -3,0 a 3,3 0 1,0 6, 0 a 3,3, 0 1,0 -6, 0",
        fillColor: "#2978b5",
        strokeColor: "#004577",
        fillOpacity: 1,
        strokeWeight: 2,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(0, 0),
    };
    callback();
}