var map;
var infoWindow;
var clusters;
var svgMarker;
function initMap(callback) {
    let params = (new URL(document.location)).searchParams
    let lat, lon
    try {
        lat = parseFloat(params.get("lat"));
        lon = parseFloat(params.get("lon"));
    } catch (error) {
        console.log("Rossz koordináták");
    }
    const zoom = lat && lon ? 16 : 13;
    const city = lat && lon ? { lat: lat, lng: lon } : { lat: 46.253, lng: 20.14824 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: zoom,
        center: city,
        mapId: "7dffb7ad9170c9ae",
        streetViewControl: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        rotateControl: true,
        fullscreenControl: false,
        gestureHandling: "greedy"
    });
    infoWindow = new google.maps.InfoWindow();
    svgMarker = {
        path: "M 0,0 m -3,0 a 3,3 0 1,0 6, 0 a 3,3, 0 1,0 -6, 0",
        fillColor: "#FFFFFF",
        strokeColor: "#000000",
        fillOpacity: 1,
        strokeWeight: 2,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(0, 0),
    };
    locationMarker = {
        path: "M 0,0 m -3,0 a 3,3 0 1,0 6, 0 a 3,3, 0 1,0 -6, 0",
        fillColor: "#2978b5",
        strokeColor: "#004577",
        fillOpacity: 1,
        strokeWeight: 2,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(0, 0),
    };
    if (lat && lon) {
        const location_marker = new google.maps.Marker({
            position: { lat: lat, lng: lon },
            icon: locationMarker,
            map: map,
            optimized: true,
            clickable: true
        });
        location_marker.addListener("click", () => {
            infoWindow.setContent(`<h2 class="align-center">Pozíció</h2>`)
            infoWindow.open(map, location_marker);
        })
    }
    callback();
}