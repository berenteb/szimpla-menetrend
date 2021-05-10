const gtfs = require("../gtfs");
module.exports = function () {
    return function(req, res, next) {
        gtfs.getShapeForShapeID(res.locals.trip.shape_id).then(shapes => {
            res.locals.shapes = shapes || [];
            // console.log(shapes);
            next();
        }).catch(err => {
            next(err);
        })
    }
}