var router = require("express").Router();
var month = require('month');

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = "/class/%id%";

// URL: "/createassignment"
module.exports = function (pool) {

    // "createassignment.ejs" page
    router.get("/:id", middleMan.checkIfUserOwnsClass, (req, res) =>
        res.render("employee/teacher/createAssignment.ejs", {
            classId: parseInt(req.params.id),
            isAdmin: true
        }));

    // Creates an assignment on form post
    router.post("/:id", middleMan.checkIfUserOwnsClass, function (req, res) {
        pool.getConnection(function (err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            redirectLocation = redirectLocation.replace("%id%", req.params.id);
            var insertAssignment = require('./queries/insertAssignment.sql');

            var dueDate = req.body.dueDate;

            var dateSplitted = dueDate.split(' '); // [ 'December', '21,', '2017' ]

            var year = parseInt(dateSplitted[2]);
            var day = parseInt(dateSplitted[1].replace(',', ''));
            var monthNumber = month(dateSplitted[0]);

            var builtDate = year + "-" + monthNumber + "-" + day

            connection.query(insertAssignment, [req.body.assignmentName, parseInt(req.body.maxMark), builtDate, parseInt(req.params.id)], function (err, rows) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                flashUtils.successMessage(req, res, redirectLocation, 'Your assingment has been created!');
            });
        });
    });

    return router;
};