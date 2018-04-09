var router = require("express").Router();

module.exports = function(pool) {
    
    router.get("/", function(req, res) {
        res.render("index.ejs");
    });

    return router;
}