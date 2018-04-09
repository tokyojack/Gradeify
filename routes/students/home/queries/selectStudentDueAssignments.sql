SELECT assignments.name, assignments.dueDate, classes.name FROM classes
    LEFT JOIN studentClasses
        ON studentClasses.classId = classes.id
    LEFT JOIN students
        ON students.studentNumber = studentClasses.studentNUmber
    LEFT JOIN assignments
        ON classes.id = assignments.classId
    LEFT JOIN studentAssignments
        ON assignments.id = studentAssignments.assignmentId AND studentAssignments.studentNumber = students.studentNumber
WHERE students.studentNumber=? AND studentAssignments.mark IS NULL;