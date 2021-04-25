const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getRoute().then(routes => {
            res.locals.routes = routes || [];
            // console.log(routes);
            next();
        }).catch(err => {
            next(err);
        })
    }
}