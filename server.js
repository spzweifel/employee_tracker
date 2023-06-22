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
          "View all roles",
          "View all departments",
          "Update employee role",
          "Add role",
          "Add departments",
          "Add an employee",
          "quit",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      if (answers.department === "View all employees") {
        viewAllEmployees();
      } else if (answers.department === "View all roles") {
        viewAllRoles();
      } else if (answers.department === "View all departments") {
        viewAllDepartments();
      } else if (answers.department === "Update employee role") {
        updateEmployeeRole();
      } else if (answers.department === "Add role") {
        addRole();
      } else if (answers.department === "Add departments") {
        addDepartment();
      } else if (answers.department === "Add an employee") {
        addEmployee();
        //add this function
      } else if (answers.department === "quit") {
        quit();
      }
    });
};

const viewAllEmployees = () => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    company();
  });
}
const viewAllDepartments = () => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    company();
  });
}
const viewAllRoles = () => {
  const sql = `SELECT * FROM roles`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    company();
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
function addEmployee() {
  db.query("SELECT first_name, last_name, role_id, manager_id value FROM employee", (err, employeeData) => {
      inquirer.prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the first name of the employee?",
          },
          {
              type: "input",
              name: "last_name",
              message: "What is the last name of the employee?",
          },
          {
              type: "input",
              name: "role_id",
              message: "What is the role of the employee?",
          },
          {
              type: "input",
              name: "manager_id",
              message: "Who is this employee's manager?",
          },
        ]).then((answer) => {
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?) `;
          db.query(
              sql,
              [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
              (err) => {
                  viewAllEmployees();
              }
          )
        })
  })
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