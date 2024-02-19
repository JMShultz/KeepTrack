
DROP DATABASE IF EXISTS Employee_Manager_db;
CREATE DATABASE Employee_Manager_db;
USE Employee_Manager_db; 

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);




CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL, 
  salary DECIMAL NOT NULL,
  department INT,
  FOREIGN KEY (department)
  REFERENCES department(id)
  ON DELETE SET NULL
);




CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleID INTEGER, 
    FOREIGN KEY (roleID)
    REFERENCES role(id)
    managerID INTEGER,
    FOREIGN KEY (managerID)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

