const gtfs = require("../gtfs");
module.exports = function () {
    return function (req, res, next) {
        gtfs.getTrip([],[],[req.params.route_id]).then(trips => {
            let directions = [];
            let index = 0;
            let ended = false;
            while (!ended) {
                let item = trips.find(item => item.direction_id === index);
                index++;
                if (item) {
                    directions.push(item);
                } else {
                    ended = true;
                }
            }
            res.locals.directions = directions;
            // console.log(directions)
            next();
        }).catch(err => {
            next(err);
        })
    }
}