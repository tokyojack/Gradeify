var router = require("express").Router();

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = "";

// URL: "/removestudentfromclass"
module.exports = function (pool) {

    // "removeStudentFromClass.ejs" page
    router.get("/:id", middleMan.checkIfUserOwnsClass, (req, res) =>
        res.render("employee/teacher/admin/removeStudentFromClass.ejs", {
            classId: parseInt(req.params.id),
            isAdmin: true
        }));

    // Remove's student to a class on form post
    router.post("/:id", middleMan.checkIfUserOwnsClass, function (req, res) {
        redirectLocation = "/class/" + req.params.id;

        pool.getConnection(function (err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var removeStudentFromClass = require('./queries/removeStudentFromClass.sql');
            connection.query(removeStudentFromClass, [parseInt(req.body.studentNumber), parseInt(req.params.id)], function (err, rows) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                flashUtils.successMessage(req, res, redirectLocation, 'Student has been removed!');
            });
        });
    });

    return router;
};