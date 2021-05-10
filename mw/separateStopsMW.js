const fs = require("fs");
var separated;
module.exports = function (dirname) {
    try {
        separated = JSON.parse(fs.readFileSync(dirname + "/db/separated.json"));
    } catch (error) {
        console.log("Nem sikerült beolvasni a szétválasztó fájlt!")
    }
    return function (req, res, next) {
        if (separated && res.locals.stop) {
            res.locals.stop.unique = separated[res.locals.stop.stop_id] || 0;
        }
        if (separated && Array.isArray(res.locals.stops)) {
            for (let i = 0; i < res.locals.stops.length; i++){
                res.locals.stops[i].unique = separated[res.locals.stops[i].stop_id] || 0;
            }
            // console.log(res.locals.stops);
            next();
        } else {
            next();
        }
    }
}