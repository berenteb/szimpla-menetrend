const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getTripsForDirection(res.locals.trips[0]).then(trips => {
            res.locals.trips = trips || [];
            // console.log(trips);
            next();
        }).catch(err => {
            next(err);
        })
    }
}