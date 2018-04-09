var router = require("express").Router();

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = "/classes";

module.exports = function(pool) {

    router.get("/:id", middleMan.checkIsAdmin, function(req, res) {
        res.render("employee/admin/addClass.ejs", {
            employeeNumber: parseFloat(req.params.id)
        });
    });

    router.post("/:id", middleMan.checkIsAdmin, function(req, res) {
        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var insertClass = require('./queries/insertClass.sql');

            connection.query(insertClass, [req.body.className, req.body.block1,  req.body.block2, parseInt(req.params.id)], function(err, rows) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                res.cookie('openedBox', req.params.id);
                flashUtils.successMessage(req, res, redirectLocation, 'Class has been added');
            });
        });
    });

    return router;
};
