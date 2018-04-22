var router = require("express").Router();

var middleMan = require("../../../utils/middleMan");
var flashUtils = require('../../../utils/flashUtils');

var redirectLocation = "/classes";

// URL: "/deleteclass"
module.exports = function(pool) {

    // Delete's the class
    router.get("/:id", middleMan.checkIsAdmin, function(req, res) {
        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var deleteClass = require('./queries/deleteClass.sql');

            var id = parseInt(req.params.id);
            connection.query(deleteClass, [id, id, id, id, id], function(err, rows) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                res.cookie('openedBox', rows[0][0].employeeNumber);
                flashUtils.successMessage(req, res, redirectLocation, 'Class Deleted');
            });
        });
    });

    return router;
};
