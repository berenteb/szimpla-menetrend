const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getTrip([req.params.trip_id]).then(trips => {
            res.locals.trips = trips[0] ? [trips[0]] : [];
            next();
        }).catch(err => {
            next(err);
        })
    }
}