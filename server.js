const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'company_db',
    },
    console.log(`Connected to the company_db database.`)
);


const company = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'department',
            message: 'What would you like to do?',
            choices: ['View all employees', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add departments', 'quit']
        }
        // {
        //     type: 'input',
        //     name: 'add_department',
        //     message: 'What department would you like to add?',
        // },
        // {
        //     type: 'input',
        //     name: 'add_employee',
        //     message: 'Please, enter the name of the employee you would like to add.',
        // },
        // {
        //     type: 'input',
        //     name: 'salary',
        //     message: 'What is the salary of this employee?',
        // },
        // {
        //     type: 'input',
        //     name: 'add_role',
        //     message: 'Please, enter the role of this employee.',
        // },
        // {
        //     type: 'list',
        //     name: 'update',
        //     message: 'Select an employee you would like to update',
        //     choices: `${employee.name}`
        // }
        //how would I code it so that it writes to sql tables?
    ]).then(answers => {
            console.log(answers)
            //giant if/else statement for every choice in the first question
            if (answers.department === 'View all employees') {
                function viewAllEmployees() {
                    const sql = `SELECT id, first_name, last_name, role_id, manager_id AS title FROM employee`;

                    db.query(sql, (err, rows) => {
                        if (err) {
                          console.log(err)
                           return;
                        }
                        console.table(rows)
                      });
                }
                viewAllEmployees()
            }
        })
    
}
company();


// function viewAllDepartments() {
//     const sql = `SELECT id, name AS title FROM department`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//           res.status(500).json({ error: err.message });
//            return;
//         }
//         console.log(rows)
//       });
// }
// viewAllDepartments()


//in the app.get, use the results of a join in query.sql as the route. I think it should look something like '/api/department-employee' or something like that. This should return the departments if I did this and understand it correctly.
// should read employee names
// app.get('/api/department', (req, res) => {
    // 
// });




// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

// Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(process.env.PORT || 3001, () => console.log(`App listening at http://localhost:${PORT}`));


//if they choose to add an employee. get all info first to add. first name, ladt name and such using inquirer. with the exception of id, ask for everything explicitly like first, last name and role and manager id. use an insert into employees() but you won't know name and id until the name is gotten from inquirer. in syntax, it is exactly what the seeds file is doing. 