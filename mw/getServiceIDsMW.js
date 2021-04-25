const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getActiveServiceIDs().then(service_ids => {
            res.locals.service_ids = service_ids || [];
            // console.log(service_ids);
            next();
        }).catch(err => {
            next(err);
        })
    }
}