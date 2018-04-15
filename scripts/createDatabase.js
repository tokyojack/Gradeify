var mysql = require('mysql');

var config = require('../config/config');
var connection = mysql.createConnection(config.db);

connection.query('CREATE TABLE `assignments` (\
 `id` int(11) NOT NULL AUTO_INCREMENT, \
 `name` varchar(255) NOT NULL, \
 `maxMark` int(11) NOT NULL, \
 `dueDate` date NOT NULL, \
 `classId` int(11) NOT NULL, \
 PRIMARY KEY (`id`), \
 KEY `classId` (`classId`) \
) ENGINE=MyISAM AUTO_INCREMENT=60 DEFAULT CHARSET=latin1');

connection.query('CREATE TABLE `classes` ( \
 `id` int(11) NOT NULL AUTO_INCREMENT, \
 `name` varchar(255) NOT NULL, \
 `block1` varchar(20) NOT NULL, \
 `block2` varchar(20) NOT NULL, \
 `employeeNumber` int(11) NOT NULL, \
 PRIMARY KEY (`id`), \
 KEY `employeeNumber` (`employeeNumber`) \
) ENGINE=MyISAM AUTO_INCREMENT=47 DEFAULT CHARSET=latin1');

connection.query('CREATE TABLE `employees` ( \
 `employeeNumber` int(11) NOT NULL, \
 `websiteRank` varchar(10) NOT NULL, \
 `jobTitle` varchar(50) NOT NULL, \
 `firstName` varchar(255) NOT NULL, \
 `lastName` varchar(255) NOT NULL, \
 PRIMARY KEY (`employeeNumber`) \
) ENGINE=MyISAM DEFAULT CHARSET=latin1');

connection.query('CREATE TABLE `studentAssignments` ( \
 `Id` int(11) NOT NULL AUTO_INCREMENT, \
 `mark` int(11) DEFAULT NULL, \
 `studentNumber` int(11) NOT NULL,\
 `assignmentId` int(11) NOT NULL, \
 `classId` int(11) NOT NULL, \
 PRIMARY KEY (`Id`), \
 KEY `studentNumber` (`studentNumber`), \
 KEY `assignmentId` (`assignmentId`), \
 KEY `classId` (`classId`) \
) ENGINE=MyISAM AUTO_INCREMENT=70 DEFAULT CHARSET=latin1');

connection.query('CREATE TABLE `studentClasses` ( \
 `id` int(11) NOT NULL AUTO_INCREMENT, \
 `studentNumber` int(11) NOT NULL, \
 `classId` int(11) NOT NULL, \
 PRIMARY KEY (`id`), \
 KEY `studentNumber` (`studentNumber`), \
 KEY `classId` (`classId`) \
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1');

connection.query('CREATE TABLE `students` ( \
 `studentNumber` int(11) NOT NULL, \
 `gradeTitle` varchar(10) NOT NULL, \
 `firstName` varchar(255) NOT NULL, \
 `lastName` varchar(255) NOT NULL, \
 PRIMARY KEY (`studentNumber`) \
) ENGINE=MyISAM DEFAULT CHARSET=latin1');

connection.query('INSERT INTO `employees`(`employeeNumber`, `websiteRank`, `jobTitle`, `firstName`, `lastName`) VALUES (0, "admin", "principal", "john", "doe")');

console.log('Success: Database Created!');

connection.end();
