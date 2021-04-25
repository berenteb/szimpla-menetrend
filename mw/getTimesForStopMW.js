const gtfs = require("../gtfs");
module.exports = function () {
    return async function (req, res, next) {
        let trip_ids = [];
        for (let trip of res.locals.trips) {
            trip_ids.push(trip.trip_id)
        }
        gtfs.getStopTime([], [res.locals.stop.stop_id], trip_ids).then(times => {
            let fields = [];
            for (let time of times) {

                if (res.locals.trip_times.find(t=>t.trip_id === time.trip_id && t.stop_sequence > time.stop_sequence)) {
                    let field = {
                        time: time,
                        trip: res.locals.trips.find(trip => trip.trip_id === time.trip_id)
                    }
                    field.route = res.locals.routes.find(route => route.route_id === field.trip.route_id);
                    fields.push(field);
                }
            }
            fields = fields.sort((a, b) => a.time.departure_timestamp - b.time.departure_timestamp);
            res.locals.fields = fields;
            // console.log(fields);
            next();
        }).catch(err => {
            next(err);
        })
    }
}