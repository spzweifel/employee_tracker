--in here, create the tables. include a drop database if exists
create TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

create table roles (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

create table employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);
