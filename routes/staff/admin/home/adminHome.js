module.exports = function(req, res, user, flashUtils, redirectLocation, pool) {

//     pool.getConnection(function(err, connection) {
//         if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
//             return;
//         var selectTeachers = require('./queries/selectTeachers.sql');

//         connection.query(selectTeachers, ["teacher"], function(err, rows) {
//             connection.release();

//             if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
//                 return;

// console.log(rows);

            res.render("employee/admin/adminHome.ejs", {
                user: user
            });

    //     });
    // });
};
