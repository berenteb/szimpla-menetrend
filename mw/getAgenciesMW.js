const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getAgency().then(agencies => {
            res.locals.agencies = agencies || [];
            // console.log(agencies);
            next();
        }).catch(err => {
            next(err);
        })
    }
}