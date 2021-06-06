const gtfs = require("../gtfs");
module.exports = function (pastDepartures = true, limit = Infinity) {
    return async function (req, res, next) {
        let trip_ids = [];
        let stop_ids = []
        let date = new Date();
        for (let trip of res.locals.trips) {
            trip_ids.push(trip.trip_id)
        }
        for (let stop of res.locals.stops) {
            stop_ids.push(stop.stop_id)
        }
        gtfs.getStopTime([], stop_ids, trip_ids).then(times => {
            let stops_with_departures = []
            for (let stop of res.locals.stops) {
                let counter = 0;
                let fields = [];
                let wasFirst = false;
                let times_for_stop = times.filter(item => item.stop_id === stop.stop_id);
                for (let time of times_for_stop) {
                    if (res.locals.trip_times.find(t => t.trip_id === time.trip_id && t.stop_sequence > time.stop_sequence)) {
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
                        if (field.timeline_position === "future-departure" || field.timeline_position === "next-departure") {
                            counter++;
                            if (counter <= limit) {
                                fields.push(field);
                            } else {
                                break;
                            }
                        } else {
                            if (pastDepartures) fields.push(field);
                        }
                    }
                }
                fields = fields.sort((a, b) => a.time.departure_timestamp - b.time.departure_timestamp);
                stop.fields = fields;
                stops_with_departures.push(stop);
            }
            res.locals.stops = stops_with_departures;
            // console.log(stops_with_departures)
            return next();
        }).catch(err => {
            next(err);
        })

    }
}
