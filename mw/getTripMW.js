const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getTrip([req.params.trip_id]).then(trip => {
            res.locals.trip = trip[0] || {};
            next();
        }).catch(err => {
            next(err);
        })
    }
}