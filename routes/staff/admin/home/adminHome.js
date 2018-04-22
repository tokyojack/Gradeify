// A part of the "homeRoutes.js"

// URL: "/home"
module.exports = function (req, res, user, flashUtils, redirectLocation, pool) {

    res.render("employee/admin/adminHome.ejs", {
        user: user
    });

};