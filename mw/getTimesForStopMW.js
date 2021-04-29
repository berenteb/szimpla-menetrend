const gtfs = require("../gtfs");
module.exports = function () {
    return async function (req, res, next) {
        let trip_ids = [];
        let date = new Date();
        for (let trip of res.locals.trips) {
            trip_ids.push(trip.trip_id)
        }
        gtfs.getStopTime([], [res.locals.stop.stop_id], trip_ids).then(times => {
            let fields = [];
            let wasFirst = false;
            for (let time of times) {
                if (res.locals.trip_times.find(t=>t.trip_id === time.trip_id && t.stop_sequence > time.stop_sequence)) {
                    let field = {
                        time: time,
                        trip: res.locals.trips.find(trip => trip.trip_id === time.trip_id)
                    }
                    field.route = res.locals.routes.find(route => route.route_id === field.trip.route_id);
                    let time_array = time.departure_time.split(":");
                    let departure_date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time_array[0], time_array[1]);
                    if (departure_date >= date) {
                        if (!wasFirst) {
                            field.timeline_position = "next-departure";
                            wasFirst = true;
                        } else {
                            field.timeline_position = "future-departure";
                        }
                    } else {
                        field.timeline_position = "past-departure";
                    }
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