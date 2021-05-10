const { getShapes } = require("gtfs");
const gtfs = require("gtfs");
const config = require("./config.json");
async function loadDB() {
    const db = await gtfs.openDb(config);
}
async function getAgency(agency_id) {
    let agencies = await gtfs.getAgencies(agency_id ? { "agency_id": agency_id } : {});
    return agencies;
}
async function getRoute(route_ids = []) {
    let query = {};
    if (route_ids.length > 0) query.route_id = route_ids;
    let routes = await gtfs.getRoutes(
        query,
        [],
        [
            ['route_color', 'DESC'],
            ['route_short_name', 'ASC']
        ]
    );
    return routes;
}
async function getTrip(trip_ids = [], service_ids = [], route_ids = []) {
    for (let i = 0; i < trip_ids.length; i++) {
        trip_ids[i] = trip_ids[i].replace("-", "/");
    }
    let query = {};
    if (service_ids.length > 0) query.service_id = service_ids;
    if (trip_ids.length > 0) query.trip_id = trip_ids;
    if (route_ids.length > 0) query.route_id = route_ids;
    let trips = await gtfs.getTrips(query);
    return trips;
}
async function getStop(stop_ids = []) {
    let query = {};
    if (stop_ids.length > 0) query.stop_id = stop_ids;
    let stops = await gtfs.getStops(query, [], [["stop_name", "ASC"]])
    return stops || [];
}
async function getStopTime(stoptime_ids = [], stop_ids = [], trip_ids = []) {
    let query = {};
    if (stoptime_ids.length > 0) query.ID = stoptime_ids;
    if (stop_ids.length > 0) query.stop_id = stop_ids;
    if (trip_ids.length > 0) query.trip_id = trip_ids;
    let times = await gtfs.getStoptimes(query,[],[["departure_timestamp", "ASC"]]);
    return times;
}
async function getStopsForTrip(trip_id) {
    trip_id = trip_id.replace("-", "/");
    let stopTimes = await gtfs.getStoptimes({
        "trip_id": trip_id
    });
    stopTimes = stopTimes.sort((a, b) => b.stop_sequence - a.stop_sequence);
    let stops = [];
    for (let i = 0; i < stopTimes.length; i++){
        let item = stopTimes[i];
        let stop = await gtfs.getStops({
            "stop_id": item.stop_id
        })
        stops.push(stop[0]);
    }
    return stops;
}
async function getTripsForDirection(trip) {
    let trips = await gtfs.getTrips({
        "route_id": trip.route_id,
        "direction_id": trip.direction_id
    });
    return trips;
}
async function getTimesForDirection(trips, stop_id) {
    let trip_ids = []
    for (let i = 0; i < trips.length; i++){
        let trip = trips[i];
        if (await isActiveToday(trip.service_id)) {
            trip_ids.push(trip.trip_id);
            // console.log(trip.service_id + ":true");
        } else {
            // console.log(trip.service_id + ":false");
        }
    }
    let times = await gtfs.getStoptimes({
        "trip_id": trip_ids,
        "stop_id": stop_id
    },[],[["departure_time","ASC"]])
    return times;
}
async function isActiveToday(service_id) {
    let date = new Date().toISOString().split("T")[0].replace("-", "").replace("-", "");
    let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    let exceptions = await gtfs.getCalendarDates({
        "service_id": service_id,
        "date": date
    });
    let calendars = await gtfs.getCalendars({
        "service_id": service_id
    });
    if (calendars.length === 0) return true;
    if (exceptions.length > 0) {
        console.log("Exception found")
        return exceptions[0].exception_type === 1;
    } else {
        let calendar = calendars[0];
        if (calendar.start_date <= date && calendar.end_date >= date) {
            let day = new Date().getDay() - 1;
            day = day === -1 ? 6 : day;
            return calendar[days[day]] === 1;
        } else return false;
    }
}

async function getActiveServiceIDs() {
    let ids = [];
    let calendars = await gtfs.getCalendars();
    for (let calendar of calendars) {
        if (await isActiveToday(calendar.service_id)) {
            ids.push(calendar.service_id);
        }
    }
    return ids;
}

async function getShapeForShapeID(shape_id) {
    let shapes = await gtfs.getShapes({
        "shape_id": shape_id
    },[],[["shape_pt_sequence", "ASC"]]);
    return shapes;
}
module.exports = {
    loadDB: loadDB,
    getAgency: getAgency,
    getRoute: getRoute,
    getTrip: getTrip,
    getStop: getStop,
    getStopTime: getStopTime,
    getStopsForTrip: getStopsForTrip,
    getTimesForDirection: getTimesForDirection,
    getTripsForDirection: getTripsForDirection,
    isActiveToday: isActiveToday,
    getActiveServiceIDs: getActiveServiceIDs,
    getShapeForShapeID: getShapeForShapeID
}