const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getStop([req.params.stop_id]).then(stops => {
            res.locals.stops = stops[0] ? [stops[0]] : [];
            // console.log(stop);
            next();
        }).catch(err => {
            next(err);
        })
    }
}