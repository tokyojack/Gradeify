SELECT assignments.name as assignmentName, assignments.maxMark, assignments.dueDate, classes.name AS className, assignments.id, assignments.classId FROM assignments 
	LEFT JOIN classes
    	ON classes.id = assignments.classId
WHERE assignments.id=?;