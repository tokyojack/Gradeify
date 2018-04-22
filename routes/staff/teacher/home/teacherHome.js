// A part of the "homeRoutes.js"

// URL: "/home"
module.exports = function(req, res, user, flashUtils, redirectLocation, pool) {

    pool.getConnection(function(err, connection) {
        if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
            return;
        var selectClassNameId = require('./queries/selectClassNameId.sql');

        connection.query(selectClassNameId, [parseInt(user.employeeNumber)], function(err, rows) {
            connection.release();

            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;


            res.render("employee/teacher/teacherHome.ejs", {
                user: user,
                classes: rows
            });
        });
    });
    
};