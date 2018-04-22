var router = require("express").Router();
var month = require('month');

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = "/class/%id%";

// URL: "/assinment"
module.exports = function(pool) {

    // "viewAssignment.ejs" page
    router.get("/:assignmentId", middleMan.checkIfUserOwnsAssignment, function(req, res) {
        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var findAssignmentById = require('./queries/findAssignmentById.sql');

            connection.query(findAssignmentById, [parseInt(req.params.assignmentId)], function(err, assignment) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                if (flashUtils.errorMessageif(req, res, "back", (assignment.length <= 0), "No assignment found with that id"))
                    return;

                res.render("employee/teacher/viewAssignment.ejs", {
                    assignment: assignment[0]
                });
            });
        });
    });

    return router;
};
