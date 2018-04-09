var router = require("express").Router();

module.exports = function() {
    
    router.get("*", function(req, res) {
        res.redirect("/");
    });
    
    router.post("*", function(req, res) {
        res.redirect("/");
    });

    return router;
};
