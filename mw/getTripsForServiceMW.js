const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getTrip([],res.locals.service_ids).then(trips => {
            res.locals.trips = trips || {};
            // console.log(trip);
            next();
        }).catch(err => {
            next(err);
        })
    }
}