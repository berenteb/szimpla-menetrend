const gtfs = require("../gtfs");
module.exports = function () {
    return function (req, res, next) {
        gtfs.getTimesForDirection(res.locals.trips, req.params.stop_id).then(times => {
            let timetable = [];
            let date = new Date();
            let nextFound = false;
            for (let i = 0; i < times.length; i++) {
                var time = times[i].departure_time.split(":");
                let found = false;
                let next = false;
                if (!nextFound && (date.getHours() === parseInt(time[0]) && date.getMinutes() <= parseInt(time[1]) || date.getHours() < parseInt(time[0]))) {
                    next = true;
                    nextFound = true;
                }
                for (let j = 0; j < timetable.length; j++) {
                    if (time[0] === timetable[j].hour) {
                        timetable[j].minutes.push({
                            minute: time[1],
                            next: next
                        });
                        found = true;
                    }
                }
                if (!found) {
                    timetable.push({
                        hour: time[0],
                        minutes: [{
                            minute: time[1],
                            next: next
                        }]
                    })
                }
            }
            if (!nextFound && times.length > 0) {
                timetable[0].minutes[0].next = true;
            }
            res.locals.timetable = timetable || [];
            // console.log(timetable);
            next();
        }).catch(err => {
            next(err);
        })
    }
}