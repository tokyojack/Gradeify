var router = require("express").Router();

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = "/home";

// URL: "/addannoucement"
module.exports = function(pool) {

    // "addAnnoucement.ejs" page
    router.get("/", middleMan.checkIsAdmin, (req, res) => res.render("employee/admin/addAnnoucement.ejs"));

    // Add's annoucement on form post
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
