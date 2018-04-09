var router = require("express").Router();
var middleMan = require("../../utils/middleMan");
var flashUtils = require('../../utils/flashUtils');
var redirectLocation = "/";
module.exports = function(pool) {

	router.get('/', middleMan.isLoggedIn, function(req, res) {
		var user = req.user;

		// Logged in user doesn't have a gradeTitle (staff)
		if (user.gradeTitle == null) {
			var websiteRank = user.websiteRank;
			require(websiteRank === "teacher" ? '../staff/teacher/home/teacherHome' : '../staff/admin/home/adminHome')(req, res, user, flashUtils, redirectLocation, pool);
		}
		else {
			require('../students/home/studentHome')(req, res, user, flashUtils, redirectLocation, pool);
		}
	});

	return router;
};
