// var classDay = require('../../utils/classDays');

module.exports = function(req, res, user, flashUtils, redirectLocation, pool) {

    pool.getConnection(function(err, connection) {
        if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
            return;

        var selectStudentDueAssignments = require('./queries/selectStudentDueAssignments.sql');

        connection.query(selectStudentDueAssignments, [parseInt(user.studentNumber)], function(err, homework) {

            if (flashUtils.isDatabaseError(req, res, redirectLocation, err)) {
                connection.release();
                return;

            }

            //have a ? for CURDATE - ?
            // var selectAnnoucements = require('./queries/selectAnnoucements.sql');

            // connection.query(selectAnnoucements, function(err, annoucements) {
            // 	connection.release();

            // 	if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
            // 		return;


            var blocks = ["A1", "B1", "C1", "D1"];
            var selectStudentClasses;

            if (blocks[0] == "A1" || blocks[0] == "B1" || blocks[0] == "C1" || blocks[0] == "D1")
                selectStudentClasses = require('./queries/selectStudentClassesBlock1.sql');
            else
                selectStudentClasses = require('./queries/selectStudentClassesBlock2.sql');



            connection.query(selectStudentClasses, [blocks[0], blocks[1], blocks[2], blocks[3], user.studentNumber], function(err, classes) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;
                console.log(classes);

                res.render("student/studentHome.ejs", {
                    user: user,
                    annoucements: [],
                    classes: classes,
                    blocks: blocks,
                    homework: homework
                });
            });
            // });

        });

    });
};
