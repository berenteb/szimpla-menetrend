# Szimpla Menetrend (Simple Timetable)
![Version](https://img.shields.io/github/package-json/v/berenteb/szimpla-menetrend?style=flat-square)   
A clean looking timetable / public transport web application for viewing bus, tram, trolleybus, train, etc. schedules and information. Based on GTFS.

Try it out here: [Szimpla Menetrend](https://menetrend.berente.net)
## Setup
There are several things to set up. This project is a bit specific for Szeged, Hungary, although it can be customized.
### Environmental variables
A .env file is needed for the server to run.
```
PORT=<your port>
SSL=<true | false> 
CERT_PATH=<path, i.e.: ./cert/cert.pem>
KEY_PATH=<path, i.e.: ./cert/key.pem>
UPDATE_RULE=<cron rule for checking DB updates via RSS feed. I.e.: "0 2 * * *">
```
### Config for GTFS
A config.json is required for the gtfs database module. Check out here:
[Node-GTFS documentation](https://github.com/BlinkTagInc/node-gtfs)
### Utilities
There are some scripts that is needed to be modified for perfect customization.
#### utils/getUpdateFeed.js
This software gets the specified RSS feed and gets the date of the latest update. It compares it to the date in the last_update.dat file. If it does not exist, returns true to run the update, else it returns whether the db is outdated according to the RSS feed.
#### utils/parseFeedSzeged.js
This file is specific for Szeged, Hungary. Change this to get alerts and information feed from your company. If you change the name of the file, edit the imports, too.
Format for the feed:
```json
[
    {
        "title":"Title",
        "text":"Lorem ipsum",
        "link":"https://example.com"
    }
]
```
