const gtfs = require("../gtfs");
module.exports = function () {
    return function (req, res, next) {
        let trip_ids = [];
        for (let trip of res.locals.trips) {
            trip_ids.push(trip.trip_id)
        }
        gtfs.getStopTime([],[],trip_ids).then(times => {
            res.locals.trip_times = times || [];
            // console.log(times);
            next();
        }).catch(err => {
            next(err);
        })
    }
}