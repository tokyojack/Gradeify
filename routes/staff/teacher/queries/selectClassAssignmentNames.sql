SELECT assignments.id, assignments.name, assignments.maxMark, DATE_FORMAT(assignments.dueDate, '%y-%m-%d') AS dueDate FROM employees
    LEFT JOIN classes
        ON employees.employeeNumber = classes.employeeNumber
    LEFT JOIN assignments
        ON classes.id = assignments.classId
    WHERE classes.id = ?;