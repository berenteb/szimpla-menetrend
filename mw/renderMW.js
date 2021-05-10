module.exports = function(view) {
    return function (req, res) {
        res.render("main", { view: view, data: res.locals });
    }
}