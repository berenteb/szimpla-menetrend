const express = require('express');
const https = require("https");
const http = require("http");
const schedule = require("node-schedule");
const gtfs = require('./gtfs');
const fs = require('fs');
require("dotenv").config();
const isUpdateAvailable = require("./utils/getUpdateFeed");
const app = express();
const update = require("./utils/db_updater")
const separator = require("./utils/separateStops")
var is_update_running = false;

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static("static"));

require('./routing')(app);

app.use((err, req, res, next) => {
    if (is_update_running) {
        err = "Az adatbázis frissítése történik. Kérlek nézz vissza később!";
    }
    res.render("main", { view: 'error', data: err });
})
var server;
if (process.env.SSL === "true") {
    const key = fs.readFileSync(process.env.KEY_PATH);
    const cert = fs.readFileSync(process.env.CERT_PATH);
    server = https.createServer({ key: key, cert: cert }, app);
    console.log("SSL cert and key loaded!");
} else {
    server = http.createServer(app);
}
server.listen(process.env.PORT, () => {
    console.log((process.env.SSL === "true" ? "HTTPS" : "HTTP") + " Server listening on " + process.env.PORT);
});

async function runUpdate() {
    let updateAvailable = await isUpdateAvailable().catch(() => { console.log("Couldn't check for update.") });
    if (updateAvailable) {
        is_update_running = true;
        console.log("Update available. Starting update.");
        try {
            await gtfs.closeDB();
        } catch (error) {
            console.log("DB was not opened");
        }
        update().then(() => {
            console.log("Update finished");
        }).catch(() => {
            console.log("Update failed");
        }).finally(async () => {
            await gtfs.loadDB();
            separator().then(() => {
                console.log("Separating finished")
            }).catch(() => {
                console.log("Separating failed");
            }).finally(() => {
                console.log("Full update process finished. Server is running as normal.")
                is_update_running = false;
            });
        })
    } else {
        console.log("No update available.");
    }
}
console.log("Scheduling auto updater for rule " + process.env.UPDATE_RULE);
schedule.scheduleJob("update", process.env.UPDATE_RULE, runUpdate);
gtfs.loadDB();
runUpdate();