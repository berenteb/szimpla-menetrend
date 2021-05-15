const gtfs = require("gtfs");
const fs = require("fs");
function run() {
    return new Promise(async (resolve, reject) => {
        console.log("Spearating stops");
        let stops = await gtfs.getStops();
        let separated = {};
        for (let stop of stops) {
            let sameStops = await gtfs.getStops({
                "stop_name": stop.stop_name
            })
            if (sameStops.length > 1) {
                let index = 1;
                for (let sameStop of sameStops) {
                    if (separated[sameStop.stop_id] === undefined) {
                        separated[sameStop.stop_id] = index;
                        index++;
                    }
                }
            }
        }
        fs.writeFileSync("./db/separated.json", JSON.stringify(separated));
        resolve();
    })
}
module.exports = run;