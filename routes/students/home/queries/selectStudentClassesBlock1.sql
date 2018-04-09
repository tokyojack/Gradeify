SELECT classes.name, classes.block1 FROM studentClasses
	LEFT JOIN classes
    	ON classes.id = studentClasses.classId
    WHERE (classes.block1=? OR classes.block1=? OR classes.block1=? OR classes.block1=?) AND studentClasses.studentNumber=?;