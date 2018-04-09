var router = require("express").Router();

module.exports = function() {
    
    router.get('/', function(req, res) {
        req.logout();
        req.flash('error', 'You have logged out');
        res.redirect('/');
    });
    
    return router;
}
