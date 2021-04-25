const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getRoute(req.params.route_id || res.locals.trip.route_id).then(route => {
            res.locals.route = route[0] || {};
            // console.log(route);
            next();
        }).catch(err => {
            next(err);
        })
    }
}