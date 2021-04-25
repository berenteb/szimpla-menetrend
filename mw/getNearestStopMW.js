const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getStop().then(stops => {
            
            // console.log(agencies);
            next();
        }).catch(err => {
            next(err);
        })
    }
}