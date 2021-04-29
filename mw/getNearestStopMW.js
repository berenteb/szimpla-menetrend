const gtfs = require("../gtfs");
module.exports = function () {
    return function (req, res, next) {
        let lon = req.query.lon;
        let lat = req.query.lat;
        if (!lon || !lat) next("Nem megfelelő koordináták.");
        let best_id, best_distance;
        for (let stop of res.locals.stops) {
            let distance = Math.sqrt(Math.pow((stop.stop_lat - lat), 2) + Math.pow((stop.stop_lon - lon), 2));
            if (best_distance !== undefined) {
                if (distance < best_distance) {
                    best_distance = distance;
                    best_id = stop.stop_id;
                }
            } else {
                best_distance = distance;
                best_id = stop.stop_id;
            }
        }
        res.redirect("/stop/" + best_id);
    }
}