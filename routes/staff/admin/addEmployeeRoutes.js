var router = require("express").Router();

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = "/home";

module.exports = function(pool) {

    router.get("/", middleMan.checkIsAdmin, function(req, res) {
        res.render("employee/admin/addEmployee.ejs");
    });

    router.post("/", middleMan.checkIsAdmin, function(req, res) {
        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var insertEmployee = require('./queries/insertEmployee.sql');

            connection.query(insertEmployee, [parseInt(req.body.employeeNumber), req.body.websiteRank, req.body.jobTitle, req.body.firstName, req.body.lastName], function(err, rows) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                flashUtils.successMessage(req, res, redirectLocation, 'You have added an employee!');
            });
        });
    });

    return router;
}
