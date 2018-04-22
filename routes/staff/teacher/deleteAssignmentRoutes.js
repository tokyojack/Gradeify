var router = require("express").Router();
var month = require('month');

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = "/class/%id%";

// URL: "/deleteassignment"
module.exports = function(pool) {

    // "deleteAssignment.ejs" page
    router.get("/:id", middleMan.checkIfUserOwnsClass, function(req, res) {
        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, '/class/' + req.params.id, err))
                return;

            var selectClassAssignmentNames = require('./queries/selectClassAssignmentNames.sql');

            connection.query(selectClassAssignmentNames, [req.params.id], function(err, assignments) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation.replace("%id%", req.params.id), err))
                    return;

                res.render("employee/teacher/deleteAssignment.ejs", {
                    classId: parseInt(req.params.id),
                    assignments: assignments,
                    isAdmin: true
                });
            });
        });
    });


    // Remove's the assignment form post
    router.post("/:id", middleMan.checkIfUserOwnsAssignment, middleMan.checkIfUserOwnsClass, function(req, res) {
        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, '/class/' + req.params.id, err))
                return;

            var deleteAssignment = require('./queries/deleteAssignment.sql');

            connection.query(deleteAssignment, [parseInt(req.body.assignmentId), parseInt(req.body.assignmentId)], function(err) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, '/class/' + req.params.id, err))
                    return;


                flashUtils.successMessage(req, res, '/class/' + req.params.id, 'You have deleted the assignment!');
            });
        });
    });

    return router;
};
