SELECT classes.id, classes.name FROM classes
    LEFT JOIN employees
        ON employees.employeeNumber = classes.employeeNumber
    WHERE employees.employeeNumber = (SELECT id FROM employees WHERE firstName=? AND lastName=?);