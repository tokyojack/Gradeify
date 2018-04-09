var router = require("express").Router();

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = "/home";

module.exports = function(pool) {

    router.get("/", middleMan.checkIsAdmin, function(req, res) {
        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;
                
            var selectTeachersAndClasses = require('./queries/selectTeachersAndClasses.sql');

            // Adding the "teacher" here instead of the query file is to prevent SQL injecting
            connection.query(selectTeachersAndClasses, ["teacher"], function(err, rows) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                var openedBox = req.cookies.openedBox;
                res.clearCookie('openedBox');

                res.render("employee/admin/classes.ejs", {
                    teachers: rows,
                    openedBox: openedBox
                });
            });
        });
    });

    return router;
}
