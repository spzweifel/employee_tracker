const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

const company = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "Update employee role",
          "View all roles",
          "Add role",
          "View all departments",
          "Add departments",
          "quit",
        ],
      },
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
    ])
    .then((answers) => {
      console.log(answers);
      //giant if/else statement for every choice in the first question
      if (answers.department === "View all employees") {
        viewAllEmployees();
      } else if (answers.department === "View all roles") {
        viewAllRoles();
      } else if (answers.department === "View all departments") {
        viewAllDepartments();
        //get help after this point
      } else if (answers.department === "Update employee role") {
        updateEmployeeRole();
      } else if (answers.department === "Add role") {
        addRole();
      } else if (answers.department === "Add departments") {
        addDepartment();
      }
    });
};

function viewAllEmployees() {
  const sql = `SELECT id, first_name, last_name, role_id, manager_id AS title FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
  });
}
function viewAllDepartments() {
  const sql = `SELECT id, name AS name FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    company()
  });
}
function viewAllRoles() {
  const sql = `SELECT id, title, salary, department_id AS name FROM roles`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    company()
  });
}
function updateEmployeeRole() {
  db.query("SELECT title name, id value FROM roles", (err, roleData) => {
    db.query(
      "SELECT concat(first_name, ' ', last_name) name, id value FROM employee",
      (err, employeeData) => {
        inquirer
          .prompt([
            {
              type: "list",
              name: "role_id",
              message: "Choose the following title",
              choices: roleData,
            },
            {
              type: "list",
              name: "employee_id",
              message: "choose a follwoing employee",
              choices: employeeData,
            },
          ])
          .then((answer) => {
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

            db.query(sql, [answer.role_id, answer.employee_id], (err, rows) => {
              if (err) {
                console.log(err);
                return;
              }
              viewAllEmployees();
            });
          });
      }
    );
  });
}
function addRole() {
  db.query("SELECT name, id value FROM department", (err, roleData) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "what title would you like to make?",
        },
        {
          type: "input",
          name: "salary",
          message: "What salary would you like to give?",
        },
        {
          type: "list",
          name: "department",
          message: "Choose the following department",
          choices: roleData,
        },
      ])
      .then((answer) => {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?) `;
        db.query(
          sql,
          [answer.title, answer.salary, answer.department],
          (err) => {
            viewAllRoles();
          }
        );
      });
  });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "what department would you like to add?",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      console.log(answer)
      db.query(sql, [answer.department], (err) => {
        viewAllDepartments();
      });
    });
}
company();

// do the add employee inquirer

//in the app.get, use the results of a join in query.sql as the route. I think it should look something like '/api/department-employee' or something like that. This should return the departments if I did this and understand it correctly.
// should read employee names
// app.get('/api/department', (req, res) => {
//
// });

// Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(process.env.PORT || 3001, () => console.log(`App listening at http://localhost:${PORT}`));

//if they choose to add an employee. get all info first to add. first name, ladt name and such using inquirer. with the exception of id, ask for everything explicitly like first, last name and role and manager id. use an insert into employees() but you won't know name and id until the name is gotten from inquirer. in syntax, it is exactly what the seeds file is doing.
