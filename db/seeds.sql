--put the inserts here with all of the values like employee name and such
INSERT INTO department (id, name)
VALUES (1, "engineering"),
       (2, "sales"),
       (3, "finance"),
       (4, "legal"),
       (5, "management");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "engineer", 80000, "engineering"),
       (2, "salesman", 120000, "sales"),
       (3, "financier", 60000, "finance"),
       (4, "lawyer", 90000, "legal"),
       (5, "manager", 200000, "management");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Ben", "Ledoux", 1, )

--join on a manager table and excluding the id