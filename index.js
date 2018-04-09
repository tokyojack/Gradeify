//============================= Packages =============================

var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var flash = require('express-flash');
var session = require('express-session');

var cookieParser = require('cookie-parser');
var colors = require('colors'); //Console colors

//============================= Pool =============================

var config = require('./config/config');
var mysql = require("mysql");
var pool = mysql.createPool(config.db);

require('require-sql');

//============================= Passport =============================


var passport = require('passport');
require('./config/passport')(passport, pool);


//============================= Letting express use them =============================


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(flash());

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'veryinteresting',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
       res.locals.url   = req.originalUrl;
    next();
});

//============================= Routes =============================

//Passport

var studentLoginRoutes = require("./routes/passport/student/studentLoginRoutes")(passport);
app.use("/login", studentLoginRoutes);

var staffLoginRoutes = require("./routes/passport/staff/employeeLoginRoutes")(passport);
app.use("/stafflogin", staffLoginRoutes);

var logoutRoutes = require("./routes/passport/logoutRoutes")();
app.use("/logout", logoutRoutes);

// Home - Handles both admin and student

var homeRoutes = require("./routes/home/homeRoutes")(pool);
app.use("/home", homeRoutes);

//Staff/Admin

var classessRoutes = require("./routes/staff/admin/classessRoutes")(pool);
app.use("/classes", classessRoutes);

var classRoutes = require("./routes/staff/teacher/classRoutes")(pool);
app.use("/class", classRoutes);

var addEmployeeRoutes = require("./routes/staff/admin/addEmployeeRoutes")(pool);
app.use("/addemployee", addEmployeeRoutes);

var employeesRoutes = require("./routes/staff/admin/employeesRoutes")(pool);
app.use("/employees", employeesRoutes);

var addClassRoutes = require("./routes/staff/admin/addClassRoutes")(pool);
app.use("/addclass", addClassRoutes);

var deleteClassRoutes = require("./routes/staff/admin/deleteClassRoutes")(pool);
app.use("/deleteclass", deleteClassRoutes);

var addStudentRoutes = require("./routes/staff/admin/addStudentRoutes")(pool);
app.use("/addstudent", addStudentRoutes);

var addAnnoucementRoutes = require("./routes/staff/admin/addAnnoucementRoutes")(pool);
app.use("/addannoucement", addAnnoucementRoutes);

var addStudentToClassRoutes = require("./routes/staff/admin/addStudentToClassRoutes")(pool);
app.use("/addstudenttoclass", addStudentToClassRoutes);

var removeStudentFromClassRoutes = require("./routes/staff/admin/removeStudentFromClassRoutes")(pool);
app.use("/removestudentfromclass", removeStudentFromClassRoutes);

var createassignmentRoutes = require("./routes/staff/teacher/createassignmentRoutes")(pool);
app.use("/createassignment", createassignmentRoutes);

var deleteAssignmentRoutes = require("./routes/staff/teacher/deleteAssignmentRoutes")(pool);
app.use("/deleteassignment", deleteAssignmentRoutes);

var assignmentViewRoutes = require("./routes/staff/teacher/assignmentViewRoutes")(pool);
app.use("/viewassignment", assignmentViewRoutes);

//Misc

var indexRoutes = require("./routes/misc/indexRoutes")();
app.use("/", indexRoutes);

var miscRoutes = require("./routes/misc/miscRoutes")();
app.use("*", miscRoutes);

exports.pool = pool;

//============================= Starting Server =============================

app.listen(8080, function() {
    console.log("Server running".rainbow);
});

//============================= Ending Server =============================

require('./utils/nodeEnding').nodeEndingCode(nodeEndInstance);

function nodeEndInstance() {
    console.log("The pool has been closed.".bgBlack.blue);
    pool.end();
}
