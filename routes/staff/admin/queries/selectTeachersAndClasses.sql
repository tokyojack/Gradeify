SELECT
    employees.employeeNumber,
    employees.firstName,
    employees.lastName,
    GROUP_CONCAT( CONCAT(classes.id, '.'), classes.name SEPARATOR ', ') AS classes
FROM employees
    LEFT JOIN classes
        ON employees.employeeNumber = classes.employeeNumber
    WHERE employees.websiteRank=?
GROUP BY employees.firstName,
         employees.lastName