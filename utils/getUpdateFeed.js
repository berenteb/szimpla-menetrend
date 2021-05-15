const reader = require("rss-to-json");
const fs = require("fs");

function isUpdateAvailable() {
    return new Promise((resolve, reject) => {
        try {
            var last_update_date = fs.readFileSync("last_update.dat");
        } catch (error) {
            console.log("Could not get last update date. Must update!");
        }
        reader.load("http://szegedimenetrend.hu/rss.xml", (err, rss) => {
            if (!rss) resolve(false);
            let items = rss.items.sort((a, b) => a.published > b.published);
            if (last_update_date === undefined || items[0].published > parseInt(last_update_date)) {
                last_update_date = items[0].published;
                fs.writeFileSync("last_update.dat", last_update_date.toString());
                resolve(true);
            } else resolve(false);
        })
    })    
}

module.exports = isUpdateAvailable;