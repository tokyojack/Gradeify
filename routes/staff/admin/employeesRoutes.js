var router = require("express").Router();

var middleMan = require("../../../utils/middleMan");

// URL: "/employees"
module.exports = function(pool) {

    // "employees.ejs" page
    router.get("/", middleMan.checkIsAdmin, (req, res) => res.render("employee/admin/employees.ejs"));

    return router;
}
