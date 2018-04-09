SELECT classes.name, classes.block2 FROM studentClasses
	LEFT JOIN classes
    	ON classes.id = studentClasses.classId
    WHERE classes.block2=? OR classes.block2=? OR classes.block2=? OR classes.block2=?;