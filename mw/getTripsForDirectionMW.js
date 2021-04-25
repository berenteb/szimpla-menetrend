const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getTripsForDirection(res.locals.trip).then(trips => {
            res.locals.trips = trips || [];
            // console.log(trips);
            next();
        }).catch(err => {
            next(err);
        })
    }
}