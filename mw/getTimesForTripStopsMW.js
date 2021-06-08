const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        res.locals.stops = res.locals.stops.map(stop => {
            stop.time = res.locals.trip_times.filter(time => time.stop_id === stop.stop_id)[0].departure_time;
            return stop;
        })
        // console.log(res.locals.stops)
        return next();
    }
}