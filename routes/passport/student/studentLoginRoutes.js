var router = require("express").Router();

module.exports = function(passport) {

    router.get("/", function(req, res) {
        res.render("student/studentLogin.ejs");
    });

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
