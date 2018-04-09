SELECT students.firstName FROM studentAssignments
	LEFT JOIN students
    	ON students.studentNumber = studentAssignments.studentNumber
    LEFT JOIN assignments
    	ON assignments.id = studentAssignments.assignmentId
    WHERE students.firstName=? AND students.lastName=? AND assignments.name=? AND studentAssignments.classId=?;