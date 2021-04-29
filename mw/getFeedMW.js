const feed = require("../parseFeedSzeged");
module.exports = function () {
    return function(req, res, next) {
        feed.then(feed => {
            if (feed.length === 0) {
                res.locals.feed = "Nem találtunk közleményt."
            } else {
                res.locals.feed = feed;
            }
            // console.log(feed);
            next();
        }).catch(err => {
            res.locals.feed = err;
            // console.log(err);
            next();
        });
    }
}