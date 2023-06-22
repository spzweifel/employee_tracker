
INSERT INTO department (name)
VALUES ("engineering"),
       ("sales"),
       ("finance"),
       ("legal"),
       ("management");

INSERT INTO roles (title, salary, department_id)
VALUES ("engineer", 80000, 1),
       ("salesman", 120000, 2),
       ("financier", 60000, 3),
       ("lawyer", 90000, 4),
       ("manager", 200000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Ledoux", 1, null),
       ("Janey", "Creeden", 2, 1),
       ("Cole", "Hendricks", 1, 2)

