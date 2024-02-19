
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer'); 
const Ctable = require('console.table'); 
const PORT = process.env.PORT || 3004;

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'Employee_Manager_db'
  },
  console.log(`Connected to the Employee_Manager_db.`)
);


db.connect(err => {
    if (err) throw err;
    console.log('error');
    Connection();
  });
  
  Connection= () =>{

    console.log("*******************************************")
    console.log("*                                          ")
    console.log("*          EMPLOYEE MANAGER                ")
    console.log("*                                          ")
    console.log("*******************************************")

    Prompt();
};


const Prompt = () => {
    inquirer.prompt ([
      {
        type: 'list',
        name: 'choices', 
        message: 'What would you like to do?',
        choices: ['View all departments', 
                  'View all roles', 
                  'View all employees', 
                  'Add a department', 
                  'Add a role', 
                  'Add an employee', 
                  'Update an employee role',
                  "View employees by department",
                  'Quit']
      }
    ])
    .then((answers)=>{
const {choices}= answers;

//
if (choices === "View all departments") {
  showDepartments();
  }

  if (choices === "View all roles") {
    ShowRoles();
  }

  if (choices === "View all employees") {
    showEmployees();
  }
  if (choices === "Add a department") {
    addDepartment();
  }
  if (choices === "Add a role") {
    addRoles();
  }
  if (choices === "Add an employee") {
    addEmployee();
  }

  if (choices === "Update an employee role") {
    updateEmployeerole();
  }
 

  if (choices === "Quit") {
    db.end()
  };

    });
};



// FUNCTIONS


showDepartments = () => {
  console.log('Showing all departments.\n');
  const mysql = `SELECT department.id AS id, department.name AS department FROM department`; 
 db.query(mysql, (error, rows) => {
    if (error) throw error;
   console.table("Response: ", rows);
   Prompt();
});

};




ShowRoles = () => {
  console.log('Showing all roles.\n');
  const mysql = `SELECT role.id AS id, role.title,role.salary,role.department as department from role`; 
 db.query(mysql, (error, rows) => {
    if (error) throw error;
   console.table("Response: ", rows);
   Prompt();
});

};




showEmployees = () => {
  console.log('Showing all employees.\n');
  const mysql = `SELECT employee.id AS id, employee.firstName, employee.lastName,employee.roleID,employee.managerID as Manager from employee`; 
 db.query(mysql, (error, rows) => {
    if (error) throw error;
   console.table("Response: ", rows);
   Prompt();
});

};


addDepartment=()=>{
  inquirer.prompt([
    {
      type: 'input', 
      name: 'addDep',
      message: "Choose department to add.",
      validate: addDep => {
        if (addDep) {
            return true;
        } else {
            console.log('Please enter a department name');
            return false;
        }
      }
    }
  ])
    .then(answers => {
      const mysql = `INSERT INTO department (name)
                  VALUES (?)`;
      db.query(mysql, answers.addDep, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answers.addDep + " to departments"); 

        showDepartments();
    });
  });

};



addRoles = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'role',
      message: "choose role to add.",
      validate: addRoles => {
        if (addRoles) {
            return true;
        } else {
            console.log('Please enter a role');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'salary',
      message: "salary for this role?  ",
     
    }
  ])
    .then(answers => {
      const inputs = [answers.role, answers.salary];

    
      const rolemysql = `SELECT name, id FROM department`; 

      db.query(rolemysql, (err, data) => {
        if (err) throw err; 
    
        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
        {
          type: 'list', 
          name: 'dept',
          message: "Select department",
          choices: dept
        }
        ])
          .then(deptChoice => {
            const dept = deptChoice.dept;
            inputs.push(dept);

            const mysql = `INSERT INTO role (title, salary, department)
                        VALUES (?, ?, ?)`;

            db.query(mysql, inputs, (err, result) => {
              if (err) throw err;
              console.log('Added' + answers.role + " to roles"); 

              ShowRoles();
       });
     });
   });
 });
};




addEmployee=()=>{
  inquirer.prompt([
    {
      type: 'input',
      name: 'fistName',
      message: "Add first name",
      validate: addFirst => {
        if (addFirst) {
            return true;
        } else {
            console.log('Enter a first name');
            return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "Add last name?",
      validate: addLast => {
        if (addLast) {
            return true;
        } else {
            console.log('Enter a last name');
            return false;
        }
      }
    }
  ])
    .then(answer => {
    const params = [answer.fistName, answer.lastName]
    
      const rolemysql = `SELECT role.id, role.title FROM role`;

      db.query(rolemysql, (err, data) => {
        if (err) throw err; 
        
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
  
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "Employee's role?",
                choices: roles
              }
            ])
              .then(roleChoice => {
                const role = roleChoice.role;
                params.push(role);
  
                const managerSql = `SELECT * FROM employee`;
  
                db.query(managerSql, (err, data) => {
                  if (err) throw err;
  
                  const managers = data.map(({ id, firstName, lastName }) => ({ name: firstName + " "+ lastName, value: id }));
  
                  
  
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'manager',
                      message: "Employee's manager?",
                      choices: managers
                    }
                  ])
                    .then(managerChoice => {
                      const manager = managerChoice.manager;
                      params.push(manager);
  
                      const mysql = `INSERT INTO employee (firstName, lastName, roleID, managerID)
                      VALUES (?, ?, ?, ?)`;
  
                      db.query(mysql, params, (err, result) => {
                      if (err) throw err;
                      console.log("Employee added!")
  
                      showEmployees();
                });
              });
            });
          });
       });
    });

};





updateEmployeerole=()=>{
const Employee_Manager_sql = `SELECT * FROM employee`;

db.query(Employee_Manager_sql, (err, data) => {
  if (err) throw err; 

const employees = data.map(({ id, firstName, lastName }) => ({ name: firstName + " "+ lastName, value: id }));

  inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: "Which employee would you like to update",
      choices: employees
    }
  ])
    .then(EmployeeChoice => {
      const employee = EmployeeChoice.name;
      const params = []; 
      params.push(employee);

      const EmployeeroleSql = `SELECT * FROM role`;

      db.query(EmployeeroleSql, (err, data) => {
        if (err) throw err; 

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        
          inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: "Employee's new role?",
              choices: roles
            }
          ])
              .then(roleChoice => {
              const role = roleChoice.role;
              params.push(role); 
              
              let employee = params[0]
              params[0] = role
              params[1] = employee 
            

              const dbEmp = `UPDATE employee SET roleID = ? WHERE id = ?`;
  
              db.query(dbEmp, params, (err, result) => {
                if (err) throw err;
              console.log("Employee updated!");
            
              showEmployees();
        });
      });
    });
  });
});


};