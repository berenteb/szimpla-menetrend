const gtfs = require("gtfs");
const config = require("./config.json")
const fs = require("fs");
async function run() {
    const db = await gtfs.openDb(config);
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
                    // console.log(sameStop.stop_name + " " + index);
                    index++;
                }
            }
        }
    }
    fs.writeFileSync("./db/separated.json", JSON.stringify(separated));
}
run();