const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getStop([req.params.stop_id]).then(stops => {
            res.locals.stop = stops[0] || {};
            // console.log(stop);
            next();
        }).catch(err => {
            next(err);
        })
    }
}