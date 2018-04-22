var router = require("express").Router();

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');
var redirectLocation = "/";

// URL: "/class"
module.exports = function (pool) {

    // "class.ejs" page
    router.get("/:id", middleMan.checkIfUserOwnsClass, function (req, res) {
        pool.getConnection(function (err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var classId = parseInt(req.params.id);
            var selectClassAssignmentNames = require('./queries/selectClassAssignmentNames.sql');

            connection.query(selectClassAssignmentNames, [classId], function (err, classAssignmentNames) {
                if (flashUtils.isDatabaseError(req, res, redirectLocation, err)) {
                    connection.release();
                    return;
                }

                var selectStudentWork = require('./queries/selectStudentWork.sql');

                connection.query(selectStudentWork, [classId], function (err, studentAssignments) {
                    connection.release();
                    if (flashUtils.isDatabaseError(req, res, redirectLocation, err)) {
                        connection.release();
                        return;

                    }

                    var isAdmin = false;
                    var user = req.user;

                    // Remove user check after middleman is added
                    if (user != undefined) {
                        if (user.gradeTitle == undefined) {
                            isAdmin = user.websiteRank === "admin";
                        }
                    }

                    res.render("employee/teacher/class.ejs", {
                        classId: classId,
                        classAssignmentNames: classAssignmentNames,
                        studentAssignments: studentAssignments,
                        isAdmin: isAdmin
                    });
                });
            });
        });
    });

    // Save's the post on button click (JS post's it)
    router.post("/:id", middleMan.checkIfUserOwnsClass, function (req, res) {

        var classId = req.params.id;
        var grades = JSON.parse(req.body.updatedGrades);

        pool.getConnection(function (err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            grades.forEach(grade => {
                if (grade.mark === 0) {
                    var deleteStudentAssignment = require('./queries/deleteStudentAssignment.sql');

                    connection.query(deleteStudentAssignment, [grade.firstName, grade.lastName, grade.assignment, classId, classId], function (err, deleted) {
                        if (flashUtils.isDatabaseError(req, res, redirectLocation, err)) {
                            connection.release();
                            return;
                        }

                        console.log("deleted " + grade.firstName + " assignment: " + grade.assignment);
                    });
                } else {
                    var findAssignment = require('./queries/findAssignment.sql');

                    connection.query(findAssignment, [grade.firstName, grade.lastName, grade.assignment, classId], function (err, assignment) {
                        if (flashUtils.isDatabaseError(req, res, redirectLocation, err)) {
                            connection.release();
                            return;
                        }

                        if (assignment.length >= 1) {

                            var updateMark = require('./queries/updateMark.sql');

                            connection.query(updateMark, [grade.mark, grade.firstName, grade.lastName, grade.assignment, classId], function (err, classNames) {
                                if (flashUtils.isDatabaseError(req, res, redirectLocation, err)) {
                                    connection.release();
                                    return;
                                }

                                console.log("updated " + grade.firstName + " assignment: " + grade.assignment + " to " + grade.mark);
                            });
                        } else {
                            var insertStudentAssignment = require('./queries/insertStudentAssignment.sql');

                            connection.query(insertStudentAssignment, [grade.mark, grade.firstName, grade.lastName, grade.assignment, classId, classId], function (err, assignment) {
                                if (flashUtils.isDatabaseError(req, res, redirectLocation, err)) {
                                    connection.release();
                                    return;
                                }
                            });
                        }

                    });

                }
            });

            connection.release();
        });

        flashUtils.successMessage(req, res, "/class/" + req.params.id, 'Saved');
    });


    return router;
};