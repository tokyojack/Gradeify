var router = require("express").Router();
var month = require('month');

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = "/class/%id%";

module.exports = function(pool) {

    router.get("/:id", middleMan.checkIfUserOwnsClass, function(req, res) {
        res.render("employee/teacher/addAssignment.ejs", {
            classId: parseInt(req.params.id),
            isAdmin: true
        });
    });

    router.post("/:id", middleMan.checkIfUserOwnsClass, function(req, res) {
        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            redirectLocation = redirectLocation.replace("%id%", req.params.id);
            var insertAssignment = require('./queries/insertAssignment.sql');

            //'YYYY-MM-DD
            //December 14, 2017

            var dueDate = req.body.dueDate;

            var dateSplitted = dueDate.split(' '); // [ 'December', '21,', '2017' ]

            var year = parseInt(dateSplitted[2]);
            var day = parseInt(dateSplitted[1].replace(',', ''));
            var monthNumber = month(dateSplitted[0]);

            var builtDate = year + "-" + monthNumber + "-" + day


            connection.query(insertAssignment, [req.body.assignmentName, parseInt(req.body.maxMark), builtDate, parseInt(req.params.id)], function(err, rows) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                flashUtils.successMessage(req, res, redirectLocation, 'Your assingment has been created!');
            });
        });
    });

    return router;
};
