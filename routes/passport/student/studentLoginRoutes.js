var router = require("express").Router();

// URL: "/login"
module.exports = function(passport) {

    // "studentLogin.ejs" page
    router.get("/", (req, res) => res.render("student/studentLogin.ejs"));

    // Check's if the login info is correct and logs them in
    router.post('/', passport.authenticate('local-student-login', {
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            }
            else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    return router;
}
