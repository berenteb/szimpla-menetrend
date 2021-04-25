const gtfs = require("../gtfs");
module.exports = function () {
    return function (req, res, next) {
        gtfs.getTimesForDirection(res.locals.trips, req.params.stop_id).then(times => {
            res.locals.times = times || [];
            // console.log(times);
            next();
        }).catch(err => {
            next(err);
        })
    }
}