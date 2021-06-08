const getRoutesMW = require("./mw/getRoutesMW");
const getTripMW = require("./mw/getTripMW");
const getRouteMW = require("./mw/getRouteMW");
const getStopMW = require("./mw/getStopMW");
const getStopsMW = require("./mw/getStopsMW");
const getAgenciesMW = require("./mw/getAgenciesMW");
const getNearbyStopsMW = require("./mw/getNearbyStopsMW");
const getTripsForDirectionMW = require("./mw/getTripsForDirectionMW");
const getTripsForServiceMW = require("./mw/getTripsForServiceMW");
const getDirectionsForRouteMW = require("./mw/getDirectionsForRouteMW");
const getStopsForDirectionMW = require("./mw/getStopsForDirectionMW");
const getTimesForDirectionMW = require("./mw/getTimesForDirectionMW");
const getTimesForStopMW = require("./mw/getTimesForStopMW");
const getTimesForTripMW = require("./mw/getTimesForTripMW");
const getTimetableForDirectionMW = require("./mw/getTimetableForDirectionMW");
const getServiceIDsMW = require("./mw/getServiceIDsMW");
const getShapeMW = require("./mw/getShapeMW");
const renderMW = require("./mw/renderMW");
const redirectMW = require("./mw/redirectMW");
const getFeedMW = require("./mw/getFeedMW");
const getLastUpdateMW = require("./mw/getLastUpdateMW");
const separateStopsMW = require("./mw/separateStopsMW");
const apiMW = require("./mw/apiMW");

module.exports = function (app) {
    app.get(
        "/nearby",
        getStopsMW(),
        getNearbyStopsMW(),
        getRoutesMW(),
        getServiceIDsMW(),
        getTripsForServiceMW(),
        getTimesForTripMW(),
        getTimesForStopMW(false, 4),
        separateStopsMW(__dirname),
        renderMW("nearby")
    );
    app.get(
        "/stop/:stop_id",
        getStopMW(),
        getRoutesMW(),
        getServiceIDsMW(),
        getTripsForServiceMW(),
        getTimesForTripMW(),
        getTimesForStopMW(),
        separateStopsMW(__dirname),
        renderMW("timesForStop")
    );
    app.get(
        "/stops",
        getStopsMW(),
        separateStopsMW(__dirname),
        renderMW("stops")
    );
    app.get(
        "/api/stops",
        getStopsMW(),
        separateStopsMW(__dirname),
        apiMW("stops")
    );
    app.get(
        "/api/shape/:trip_id",
        getTripMW(),
        getRouteMW(),
        getStopsForDirectionMW(),
        separateStopsMW(__dirname),
        getShapeMW(),
        apiMW(["stops", "shapes"])
    );
    app.get(
        "/times-for-direction/:trip_id/:stop_id",
        getTripMW(),
        getRouteMW(),
        getStopMW(),
        getTripsForDirectionMW(),
        getTimesForDirectionMW(),
        getTimetableForDirectionMW(),
        separateStopsMW(__dirname),
        renderMW("timesForDirection")
    );
    app.get(
        "/stops-for-direction/:trip_id",
        getTripMW(),
        getRouteMW(),
        getStopsForDirectionMW(),
        separateStopsMW(__dirname),
        renderMW("stopsForDirection")
    );
    app.get(
        "/directions-for-route/:route_id",
        getRouteMW(),
        getDirectionsForRouteMW(),
        renderMW("directionsForRoute")
    );
    app.get(
        "/trip-map/:trip_id",
        getTripMW(),
        getRouteMW(),
        renderMW("tripMap")
    );
    app.get(
        "/stop-map",
        renderMW("stopMap")
    )
    app.get(
        "/faq",
        renderMW("faq")
    )
    app.get(
        "/",
        getAgenciesMW(),
        getRoutesMW(),
        getFeedMW(),
        getLastUpdateMW(),
        renderMW("routes")
    );
    app.get(
        "/*",
        redirectMW("/")
    )
}