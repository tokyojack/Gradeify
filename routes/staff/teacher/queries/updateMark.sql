UPDATE studentAssignments
	LEFT JOIN students
    	ON students.studentNumber = studentAssignments.studentNumber
    LEFT JOIN assignments
    	ON assignments.id = studentAssignments.assignmentId
    SET studentAssignments.mark=?, studentAssignments.studentNumber=students.studentNumber, studentAssignments.assignmentId=assignments.id
	WHERE students.firstName=? AND students.lastName=? AND assignments.name=? AND studentAssignments.classId=?;