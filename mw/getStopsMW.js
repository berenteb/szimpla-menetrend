const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getStop().then(stops => {
            res.locals.stops = stops || [];
            next();
        }).catch(err => {
            next(err);
        })
    }
}