-- this has all the queries. look more into this
SELECT department.name AS department, employee.first_name, employee.last_name, employee.role_id
FROM employee
LEFT JOIN department
ON employee.role_id = department.id
ORDER BY department.name