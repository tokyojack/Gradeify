var router = require("express").Router();

var middleMan = require("../../utils/middleMan");
var flashUtils = require('../../utils/flashUtils');

var redirectLocation = "/";

// URL: "/home"
module.exports = function(pool) {

	//"studentHome.ejs" page
	router.get('/', middleMan.isLoggedIn, function(req, res) {
		var user = req.user;

		// Logged in user doesn't have a gradeTitle (staff)
		if (user.gradeTitle == null) {
			// If the website rank is teacher, render "teacherHome.ejs", else "adminHome.ejs"
			require(user.websiteRank === "teacher" ? '../staff/teacher/home/teacherHome' : '../staff/admin/home/adminHome')(req, res, user, flashUtils, redirectLocation, pool);
		}
		else {
			// If the person's a student
			require('../students/home/studentHome')(req, res, user, flashUtils, redirectLocation, pool);
		}
	});

	return router;
};
