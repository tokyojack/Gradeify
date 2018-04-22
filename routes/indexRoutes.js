var router = require("express").Router();

module.exports = function(pool) {
    
    router.get("/", (req, res) => res.render("index.ejs"));

    return router;
}