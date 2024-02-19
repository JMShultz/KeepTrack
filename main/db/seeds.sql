INSERT INTO department (name)
VALUES 
('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Operations');

INSERT INTO role (title, salary, department)
VALUES
('Full Stack Developer', 90000, 1),
('Software Engineer', 140000, 1),
('Accountant', 10000, 2), 
('Finanical Analyst', 140000, 2),
('Marketing Coordindator', 60000, 3), 
('Sales Lead', 90000, 3),
('Project Manager', 100000, 4),
('Operations Manager', 90000, 4);


INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES 
('Matt', 'combs', 2, null),
('Ron ', 'brown', 1, 1),
('Jake', 'Steel', 4, null),
('Mike', 'Crown', 3, 3),
('Tom ', 'Cruise', 6, null),
('Arnold', 'Palmer', 5, 5),
('Tom', 'Stallone', 7, null),
('kate', 'Rays', 8, 7);

