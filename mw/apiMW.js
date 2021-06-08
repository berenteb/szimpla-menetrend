module.exports = function (fieldnames) {
    return function (req, res, next) {
        if (Array.isArray(fieldnames)) {
            let result = {};
            for (let name of fieldnames) {
                result[name] = res.locals[name];
            }
            res.send(JSON.stringify(result));
        } else {
            res.send(JSON.stringify(res.locals[fieldnames]));
        }
    }
}