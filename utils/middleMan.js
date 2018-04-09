//{"id":29,"gradeTitle":"10","firstName":"jack","studentNumber":123,"lastName":"clarke","created_at":"2017-12-04T05:58:57.000Z"}
//{"id":10,"jobTitle":"admin","websiteRank":"admin","firstName":"jack","employeeNumber":123,"lastName":"clarke","created_at":"2017-12-04T05:59:21.000Z"}
var flashUtils = require('./flashUtils');

//TODO made flashes to flash utils

exports.checkIfUserOwnsClass = function(req, res, next) {
    if (!isStaffLoggedIn(req, res))
        return;

    if (req.user.websiteRank != null) {
        if (req.user.websiteRank === "admin") {
            next();
            return;
        }

        if (req.user.websiteRank === "teacher") {

            var pool = require('../index').pool;

            pool.getConnection(function(err, connection) {
                if (flashUtils.isDatabaseError(req, res, "back", err))
                    return;

                connection.query("SELECT employeeNumber FROM classes WHERE id = ?", [parseInt(req.params.id)], function(err, rows) {

                    if (rows.length <= 0)
                        return;

                    if (flashUtils.isDatabaseError(req, res, "back", err))
                        return;

                    if (rows[0].employeeNumber == req.user.employeeNumber) {
                        next();
                        return;
                    }

                    flashUtils.errorMessage(req, res, "/class/" + req.params.id, "You don't own this class!");
                });
            });

            return;
        }
    }
    flashUtils.errorMessage(req, res, "back", "You don't own this class!");

};

exports.checkIfUserOwnsAssignment = function(req, res, next) {
    if (!isStaffLoggedIn(req, res))
        return;

    if (req.user.websiteRank != null) {
        if (req.user.websiteRank === "admin") {
            next();
            return;
        }

        if (req.user.websiteRank === "teacher") {

            var pool = require('../index').pool;

            pool.getConnection(function(err, connection) {
                if (flashUtils.isDatabaseError(req, res, "back", err))
                    return;

                //TODO seperate file
                var query = 'SELECT classes.employeeNumber FROM assignments LEFT JOIN classes ON classes.id = assignments.classId WHERE assignments.id=?';
                connection.query(query, [parseInt(req.body.assignmentId)], function(err, rows) {
                    if (rows.length <= 0)
                        return;

                    if (flashUtils.isDatabaseError(req, res, "back", err))
                        return;

                    if (rows[0].employeeNumber == req.user.employeeNumber) {
                        next();
                        return;
                    }

                    flashUtils.errorMessage(req, res, "/class/" + req.params.id, "You don't own this class!");
                });
            });

            return;
        }
    }
    flashUtils.errorMessage(req, res, "back", "You don't own this assignment!");

};

exports.checkIsStudent = function(req, res, next) {
    if (!isLoggedIn(req, res))
        return;

    if (req.user.websiteRank == null) {
        next();
        return;
    }
    req.flash("error", "Only students can do that");
    res.redirect("back");
};

exports.checkIsStudentOrTeacherAdmin = function(req, res, next) {
    if (!isStaffLoggedIn(req, res))
        return;

    if (req.user.websiteRank != null) {
        if (req.user.websiteRank === "teacher" || req.user.websiteRank === "admin") {
            next();
            return;
        }
    }

    if (req.user.websiteRank == null) {
        next();
        return;
    }

    req.flash("error", "Only students can do that");
    res.redirect("back");
};

exports.checkIsAdmin = function(req, res, next) {
    if (!isStaffLoggedIn(req, res))
        return;

    if (req.user.websiteRank != null) {
        if (req.user.websiteRank === "admin") {
            next();
            return;
        }
    }
    req.flash("error", "Only admins or greater can do that");
    res.redirect("back");
};

exports.checkIsTeacherOrGreater = function(req, res, next) {
    if (!isStaffLoggedIn(req, res))
        return;

    if (req.user.websiteRank != null) {
        if (req.user.websiteRank === "teacher" || req.user.websiteRank === "admin") {
            next();
            return;
        }
    }
    req.flash("error", "Only teacher or greater can do that");
    res.redirect("back");
};

exports.checkIsDefaultOrGreater = function(req, res, next) {
    if (!isStaffLoggedIn(req, res))
        return;

    if (req.user.websiteRank != null) {
        if (req.user.websiteRank === "default" || req.user.websiteRank === "teacher" || req.user.websiteRank === "admin") {
            next();
            return;
        }
    }
    req.flash("error", "Only defaults or greater can do that");
    res.redirect("back");
};

exports.checkIsAdmin = function(req, res, next) {
    if (!isStaffLoggedIn(req, res))
        return;

    if (req.user.websiteRank != null) {
        if (req.user.websiteRank === "admin") {
            next();
            return;
        }
    }
    req.flash("error", "Only admins can do that");
    res.redirect("back");
};

exports.checkIsTeacher = function(req, res, next) {
    if (!isStaffLoggedIn(req, res))
        return;

    if (req.user.websiteRank != null) {
        if (req.user.websiteRank === "teacher") {
            next();
            return;
        }
    }
    req.flash("error", "Only teacher can do that");
    res.redirect("back");
};

exports.checkIsDefault = function(req, res, next) {
    if (!isLoggedIn(req, res))
        return;

    if (req.user.websiteRank != null) {
        if (req.user.websiteRank === "default") {
            next();
            return;
        }
    }
    req.flash("error", "Only defaults can do that");
    res.redirect("back");
};

exports.isLoggedIn = function(req, res, next) {
    if (!(isLoggedIn(req, res)))
        return;

    return next();
};



function isLoggedIn(req, res) {
    if (req.isAuthenticated())
        return true;

    req.flash("error", "You must be logged in todo that.");
    res.redirect("/login");
    return false;
}

function isStaffLoggedIn(req, res) {
    if (req.isAuthenticated())
        return true;

    req.flash("error", "You must be logged in todo that.");
    res.redirect("/stafflogin");
    return false;
}