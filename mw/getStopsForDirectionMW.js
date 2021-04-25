const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getStopsForTrip(req.params.trip_id).then(stops => {
            res.locals.trip_id = req.params.trip_id;
            res.locals.stops = stops.reverse() || [];
            // console.log(res.locals.trip_id);
            next();
        }).catch(err => {
            next(err);
        })
    }
}