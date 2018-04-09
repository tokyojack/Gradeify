SELECT employees.employeeNumber, employees.firstName, employees.lastName, classes.id, classes.name FROM employees
	LEFT JOIN classes
    	ON classes.employeeNumber = employees.employeeNumber
WHERE websiteRank=?
    ORDER BY employees.employeeNumber