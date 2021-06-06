const gtfs = require("../gtfs");
module.exports = function () {
    return function (req, res, next) {
        const radius = 300;
        res.locals.lon = req.query.lon;
        res.locals.lat = req.query.lat;
        let lon = req.query.lon;
        let lat = req.query.lat;
        if (!lon || !lat) next("Nem megfelelő koordináták.");
        let stops_in_radius = [];

        for (let stop of res.locals.stops) {
            let distance = measure(lat, lon, stop.stop_lat, stop.stop_lon);
            if (distance < radius) {
                stop.distance = Math.floor(distance);
                stops_in_radius.push(stop);
            }
        }
        if (stops_in_radius.length === 0) {
            let best_stop, best_distance;
            for (let stop of res.locals.stops) {
                let distance = Math.sqrt(Math.pow((stop.stop_lat - lat), 2) + Math.pow((stop.stop_lon - lon), 2));
                if (best_distance !== undefined) {
                    if (distance < best_distance) {
                        best_distance = distance;
                        best_stop = stop;
                    }
                } else {
                    best_distance = distance;
                    best_stop = stop;
                }
            }
            stops_in_radius.push(best_stop);
        }
        res.locals.stops = stops_in_radius.sort((a, b) => a.distance - b.distance);
        // console.log(stops_in_radius);
        next();
    }
}

function measure(lat1, lon1, lat2, lon2) {  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
}