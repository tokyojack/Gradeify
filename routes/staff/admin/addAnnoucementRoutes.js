var router = require("express").Router();

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = "/home";

module.exports = function(pool) {

    router.get("/", middleMan.checkIsAdmin, function(req, res) {
        res.render("employee/admin/addAnnoucement.ejs");
    });

    router.post("/", middleMan.checkIsAdmin, function(req, res) {
        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var insertAnnoucement = require('./queries/insertAnnoucement.sql');

            connection.query(insertAnnoucement, [req.body.annoucement], function(err, rows) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                flashUtils.successMessage(req, res, redirectLocation, 'You have added an annoucements!');
            });
        });
    });

    return router;
}
