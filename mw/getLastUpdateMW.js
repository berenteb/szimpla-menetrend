const fs = require("fs");
module.exports = function () {
    return function(req, res, next) {
        try {
            var file = fs.readFileSync("last_update.dat");
            let date = new Date(parseInt(file)).toLocaleDateString("hu");
            res.locals.update = date;
            next();
        } catch (error) {
            res.locals.update = "Ismeretlen";
            next();
        }
    }
}