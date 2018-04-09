DELETE studentAssignments.* FROM studentAssignments
    LEFT JOIN students
        ON studentAssignments.studentNumber = students.studentNumber
    LEFT JOIN assignments
        ON studentAssignments.assignmentId = assignments.id
    WHERE students.firstName=? AND students.lastName=? AND assignments.name=? AND assignments.classId=? AND studentAssignments.classId=? 