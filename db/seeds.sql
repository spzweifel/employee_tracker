
INSERT INTO department (id, name)
VALUES (1, "engineering"),
       (2, "sales"),
       (3, "finance"),
       (4, "legal"),
       (5, "management");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "engineer", 80000, 1),
       (2, "salesman", 120000, 2),
       (3, "financier", 60000, 3),
       (4, "lawyer", 90000, 4),
       (5, "manager", 200000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Ben", "Ledoux", 1, null),
       (2, "Janey", "Creeden", 2, 1),
       (3, "Cole", "Hendricks", 1, 2)

