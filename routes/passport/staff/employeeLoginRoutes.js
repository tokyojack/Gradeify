var router = require("express").Router();

module.exports = function(passport) {

    router.get("/", function(req, res) {
        res.render("employee/login/employeeLogin.ejs");
    });

    router.post('/', passport.authenticate('local-employee-login', {
            successRedirect: '/home',
            failureRedirect: '/stafflogin',
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
