var router = require("express").Router();

// URL: "/stafflogin"
module.exports = function(passport) {

    // "employeeLogin.ejs" page
    router.get("/", (req, res) => res.render("employee/login/employeeLogin.ejs"));

    // Check's if the login info is correct and logs them in
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
