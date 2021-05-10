function init() {
    initMap(addStopMarkers);
}
function addStopMarkers() {
    fetch(location.origin + "/api/shape").then((data) => data.json()).then(stops => {
        if (Array.isArray(stops)) {
            let markers = stops.map(stop => {
                const marker = new google.maps.Marker({
                    position: { lat: stop.stop_lat, lng: stop.stop_lon },
                    // label: stop.stop_name,
                    icon: svgMarker,
                    map: map,
                    optimized: true,
                    clickable: true
                });
                marker.addListener("click", () => {
                    infoWindow.setContent(
                        `<div class="align-center">
                        <h2>${stop.stop_name} ${stop.unique === 0 ? "" : "<span class='stop-unique'>" + stop.unique + "</span>"}</h2>
                        <a href="/stop/${stop.stop_id}">Megnyitás</a>
                        </div>`)
                    infoWindow.open(map, marker);
                })
                return marker;
            })
            new MarkerClusterer(map, markers, {
                imagePath:
                    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
            });
        }
    }).catch(err => {
        console.log(err);
    })
}