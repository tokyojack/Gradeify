var router = require("express").Router();

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = ""; // Get's set in post

module.exports = function(pool) {

    router.get("/:id", middleMan.checkIfUserOwnsClass, function(req, res) {
        res.render("employee/teacher/admin/addStudentToClass.ejs", {
            classId: parseInt(req.params.id),
            isAdmin: true
        });
        //FIX IS ADMIN
    });

    router.post("/:id", middleMan.checkIfUserOwnsClass, function(req, res) {
        redirectLocation = "/class/" + req.params.id;

        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var addStudentToClass = require('./queries/addStudentToClass.sql');
            connection.query(addStudentToClass, [parseInt(req.body.studentNumber), parseInt(req.params.id)], function(err, rows) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                flashUtils.successMessage(req, res, redirectLocation, 'Student has been added!');
            });
        });
    });

    return router;
};
