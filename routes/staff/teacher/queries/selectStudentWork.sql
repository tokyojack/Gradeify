SELECT students.firstName, students.lastName, studentAssignments.mark, assignments.id AS assignmentId
FROM classes
	LEFT JOIN studentClasses
    	ON studentClasses.classId = classes.id
    LEFT JOIN students
    	ON students.studentNumber = studentClasses.studentNumber
    LEFT JOIN assignments
       ON classes.id = assignments.classId
    LEFT JOIN studentAssignments
    	ON assignments.id = studentAssignments.assignmentId AND studentAssignments.studentNumber = students.studentNumber
    WHERE classes.id=?