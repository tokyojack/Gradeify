var router = require("express").Router();

var middleMan = require("../../../utils/middleMan");

module.exports = function(pool) {

    router.get("/", middleMan.checkIsAdmin, function(req, res) {
        res.render("employee/admin/employees.ejs");
    });

    return router;
}
