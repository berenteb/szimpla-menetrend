const getRoutesMW = require("./mw/getRoutesMW");
const getTripMW = require("./mw/getTripMW");
const getRouteMW = require("./mw/getRouteMW");
const getStopMW = require("./mw/getStopMW");
const getStopsMW = require("./mw/getStopsMW");
const getAgenciesMW = require("./mw/getAgenciesMW");
const getTripsForDirectionMW = require("./mw/getTripsForDirectionMW");
const getTripsForServiceMW = require("./mw/getTripsForServiceMW");
const getDirectionsForRouteMW = require("./mw/getDirectionsForRouteMW");
const getStopsForDirectionMW = require("./mw/getStopsForDirectionMW");
const getTimesForDirectionMW = require("./mw/getTimesForDirectionMW");
const getTimesForStopMW = require("./mw/getTimesForStopMW");
const getTimesForTripMW = require("./mw/getTimesForTripMW");
const getTimetableForDirectionMW = require("./mw/getTimetableForDirectionMW");
const getServiceIDsMW = require("./mw/getServiceIDsMW");
const renderMW = require("./mw/renderMW");
const redirectMW = require("./mw/redirectMW");
const getFeedMW = require("./mw/getFeedMW");

module.exports = function (app) {
    app.get(
        "/stop/:stop_id",
        getStopMW(),
        getRoutesMW(),
        getServiceIDsMW(),
        getTripsForServiceMW(),
        getTimesForTripMW(),
        getTimesForStopMW(),
        renderMW("timesForStop")
    );
    app.get(
        "/stops",
        getStopsMW(),
        renderMW("stops")
    );
    app.get(
        "/times-for-direction/:trip_id/:stop_id",
        getTripMW(),
        getRouteMW(),
        getStopMW(),
        getTripsForDirectionMW(),
        getTimesForDirectionMW(),
        getTimetableForDirectionMW(),
        renderMW("timesForDirection")
    );
    app.get(
        "/stops-for-direction/:trip_id",
        getTripMW(),
        getRouteMW(),
        getStopsForDirectionMW(),
        renderMW("stopsForDirection")
    );
    app.get(
        "/directions-for-route/:route_id",
        getRouteMW(),
        getDirectionsForRouteMW(),
        renderMW("directionsForRoute")
    );
    app.get(
        "/",
        getAgenciesMW(),
        getRoutesMW(),
        getFeedMW(),
        renderMW("routes")
    );
    app.get(
        "/*",
        redirectMW("/")
    )
}