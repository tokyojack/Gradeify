var router = require("express").Router();

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = "/home";

module.exports = function(pool) {

    router.get("/", middleMan.checkIsAdmin, function(req, res) {
        res.render("employee/admin/addStudent.ejs", {
            employeeNumber: parseFloat(req.params.id)
        });
    });

    router.post("/", middleMan.checkIsAdmin, function(req, res) {
        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var insertStudent = require('./queries/insertStudent.sql');

            connection.query(insertStudent, [parseInt(req.body.studentNumber), req.body.gradeTitle, req.body.firstName, req.body.lastName], function(err, rows) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                flashUtils.successMessage(req, res, redirectLocation, 'You have added a student!');
            });
        });
    });

    return router;
};
