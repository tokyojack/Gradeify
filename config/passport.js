var dbconfig = require('./config').db;

var student_tableName = "students";
var employee_tableName = "employees";

var LocalStrategy = require('passport-local').Strategy;
var flashUtils = require('../utils/flashUtils');

//////////TODO
//Beetter error handeling

module.exports = function(passport, pool) {


    passport.serializeUser(function(user, done) {
        done(null, user.studentNumber == null ? user.employeeNumber + "e" : user.studentNumber + "s");
    });

    passport.deserializeUser(function(number, done) {
        pool.getConnection(function(err, connection) {
            if (err)
                console.log(err);


            var query = (number.endsWith("s") && !(number.endsWith("e")) ? "SELECT * FROM " + student_tableName + " WHERE studentNumber = ?" : "SELECT * FROM " + employee_tableName + " WHERE employeeNumber = ?").toString();

            var id = parseInt(number.substring(0, number.length - 1));

            connection.query(query, [id], function(err, rows) {
                connection.release();

                done(err, rows[0]);
            });
        });
    });

    passport.use(
        'local-student-signup',
        new LocalStrategy({
                usernameField: 'studentNumber',
                passwordField: 'lastName',
                passReqToCallback: true
            },
            function(req, studentNumber, lastName, done) {
                pool.getConnection(function(err, connection) {

                    if (isDatabaseError(req, connection, err))
                        return done(null, false, { message:'Error with the database'});


                    connection.query("SELECT * FROM " + student_tableName + " WHERE studentNumber = ?", [studentNumber], function(err, rows) {
                        if (isDatabaseError(req, connection, err))
                            return done(null, false, { message:'Error with the database'});


                        if (rows.length) {
                            return done(null, false, { message:'Error with the database'});
                        }
                        else {
                            var newUserMysql = {
                                studentNumber: studentNumber,
                                gradeTitle: req.body.gradeTitle,
                                firstName: req.body.firstName.toLowerCase(),
                                lastName: lastName.toLowerCase()
                            };

                            var insertQuery = "INSERT INTO " + student_tableName + " ( studentNumber, gradeTitle, firstName, lastName ) values (?,?,?,?)";

                            connection.query(insertQuery, [newUserMysql.studentNumber, newUserMysql.gradeTitle, newUserMysql.firstName, newUserMysql.lastName], function(err, rows) {
                                if (isDatabaseError(req, connection, err))
                                    return done(null, false, { message:'Error with the database'});


                                connection.release();
                                return done(null, newUserMysql);
                            });
                        }
                    });
                });
            })
    );

    passport.use(
        'local-student-login',
        new LocalStrategy({
                usernameField: 'studentNumber',
                passwordField: 'lastName',
                passReqToCallback: true
            },
            function(req, studentNumber, lastName, done) {
                pool.getConnection(function(err, connection) {
                    if (isDatabaseError(req, connection, err))
                        return done(null, false, { message:'Error with the database'});


                    connection.query("SELECT * FROM " + student_tableName + " WHERE studentNumber = ?", [studentNumber], function(err, rows) {
                        if (isDatabaseError(req, connection, err))
                            return done(null, false, { message:'Error with the database'});


                        connection.release();

                        if (err)
                            return done(err);

                        if (!rows.length) {
                            return done(null, false, { message:'No username'});
                        }

                        if (lastName != rows[0].lastName)
                            return done(null, false, { message:'Wrong last name'});

                        return done(null, rows[0]);
                    });
                });
            })
    );


    passport.use(
        'local-employee-signup',
        new LocalStrategy({
                usernameField: 'employeeNumber',
                passwordField: 'lastName',
                passReqToCallback: true
            },
            function(req, employeeNumber, lastName, done) {
                pool.getConnection(function(err, connection) {
                    if (isDatabaseError(req, connection, err))
                        return done(null, false, { message:'Error with the database'});


                    connection.query("SELECT * FROM " + employee_tableName + " WHERE employeeNumber = ?", [employeeNumber], function(err, rows) {
                        if (isDatabaseError(req, connection, err))
                            return done(null, false, { message:'Error with the database'});


                        if (rows.length) {
                            return done(null, false,{ message: 'Error with the database'});
                        }
                        else {
                            var newUserMysql = {
                                jobTitle: req.body.jobTitle.toLowerCase(),
                                websiteRank: req.body.websiteRank.toLowerCase(),
                                firstName: req.body.firstName.toLowerCase(),
                                employeeNumber: employeeNumber,
                                lastName: lastName.toLowerCase()
                            };

                            var insertQuery = "INSERT INTO " + employee_tableName + " ( employeeNumber, jobTitle, websiteRank, firstName, lastName ) values (?,?,?,?,?)";

                            connection.query(insertQuery, [newUserMysql.employeeNumber, newUserMysql.jobTitle, newUserMysql.websiteRank, newUserMysql.firstName, newUserMysql.lastName], function(err, rows) {
                                if (isDatabaseError(req, connection, err))
                                    return done(null, false,{ message: 'Error with the database'});

                                connection.release();
                                return done(null, newUserMysql);
                            });
                        }
                    });
                });
            })
    );

    passport.use(
        'local-employee-login',
        new LocalStrategy({
                usernameField: 'employeeNumber',
                passwordField: 'lastName',
                passReqToCallback: true
            },
            function(req, employeeNumber, lastName, done) {
                pool.getConnection(function(err, connection) {
                    if (isDatabaseError(req, connection, err))
                        return done(null, false, req.flash('error', { message:'Error with the database'}));

                    connection.query("SELECT * FROM " + employee_tableName + " WHERE employeeNumber = ?", [employeeNumber], function(err, rows) {
                        if (isDatabaseError(req, connection, err))
                            return done(null, false, req.flash('error',{ message: 'Error with the database'}));


                        connection.release();


                        if (!rows.length) {
                            return done(null, false, { message:'No username'});
                        }


                        if (lastName != rows[0].lastName)
                            return done(null, false);

                        return done(null, rows[0]);
                    });
                });
            })
    );

    function isDatabaseError(req, connection, err) {
        if (err) {
            console.log(err);
            connection.release();
            return true;
        }
    }

};
