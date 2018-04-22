var router = require("express").Router();

// URL: "*" (Anything that wasn't redirected before this)
module.exports = function() {
    
    router.get("*", (req, res) => res.redirect("/"));
    
    router.post("*", (req, res) => res.redirect("/"));

    return router;
};
