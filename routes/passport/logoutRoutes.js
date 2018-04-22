var router = require("express").Router();

var flashUtils = require('../../utils/flashUtils');

// URL: "/logout"
module.exports = function() {
    
    // Log's out the player
    router.get('/', function(req, res) {
        req.logout();
        flashUtils.errorMessage(req, res, '/', "You have logged out")
    });
    
    return router;
}
