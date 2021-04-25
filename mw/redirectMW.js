module.exports = function(target) {
    return function(req,res) {
        res.redirect(target);
    }
}