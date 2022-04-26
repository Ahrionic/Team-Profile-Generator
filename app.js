const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const inquirer = require("inquirer")
const path = require("path")
const fs = require("fs")
const fse = require('fs-extra')

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")

const render = require("./lib/htmlRenderer")


let employeeSystem = []

//outputs the built team to output file
const builtTeam = () => {
  let newTeamHTML = render(employeeSystem)

  fse.outputFile('output/team.html', newTeamHTML)
    .then(() => {
      console.log('The file has been saved!')
    })
    .catch(err => {
      console.error(err)
    })
}

//lets you add more members
const addMoreMembers = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'moreMemebers',
      message: 'Would you like to add more team members?',
      choices: ['Yes', 'No']
    }
  ])
  .then(answer => {
    if (answer.moreMemebers === 'Yes'){
      newEmployee()
    } else if (answer.moreMemebers === 'No') {
      console.log(employeeSystem)
      builtTeam()
    }
  })
}

//lets you add either and engineer or intern as well as their info
const newEmployee = () => {
  inquirer.prompt([{
    type: 'list',
    name: 'employeeRole',
    message: 'Please select an employee type: ',
    choices: ['Engineer', 'Intern']
  }])
    .then(response => {
      if (response.employeeRole === 'Engineer') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'engineerName',
            message: 'What is the engineer\'s name?'
          },
          {
            type: 'input',
            name: 'engineerID',
            message: 'What is the engineer\'s ID?'
          },
          {
            type: 'input',
            name: 'engineerEmail',
            message: 'What is the engineer\'s email?'
          },
          {
            type: 'input',
            name: 'engineerGithub',
            message: 'What is the engineer\'s github?'
          }
        ])
          .then(engineer => {
            let newEngineer = new Engineer(engineer.engineerName, engineer.engineerID, engineer.engineerEmail, engineer.engineerGithub)
            employeeSystem.push(newEngineer)
            addMoreMembers()
          })
      } else if (response.employeeRole === 'Intern') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'internName',
            message: 'What is the intern\'s name?'
          },
          {
            type: 'input',
            name: 'internID',
            message: 'What is the intern\'s ID?'
          },
          {
            type: 'input',
            name: 'internEmail',
            message: 'What is the intern\'s email?'
          },
          {
            type: 'input',
            name: 'internSchool',
            message: 'What is the intern\'s school?'
          }
        ])
          .then(intern => {
            let newIntern = new Intern(intern.internName, intern.internID, intern.internEmail, intern.internSchool)
            employeeSystem.push(newIntern)
            addMoreMembers()
          })
      } 
    })
}

//adding the information of the manager
inquirer.prompt([
  {
    type: 'input',
    name: 'managerName',
    message: 'What is the team manager\'s name?'
  },
  {
    type: 'input',
    name: 'managerID',
    message: 'What is the team manager\'s ID?'
  },
  {
    type: 'input',
    name: 'managerEmail',
    message: 'What is the team manager\'s email?'
  },
  {
    type: 'input',
    name: 'managerOfficeNumber',
    message: 'What is the team manager\'s office number?'
  }
])
  .then(manager => {
    let newManager = new Manager(manager.managerName, manager.managerID, manager.managerEmail, manager.managerOfficeNumber)
    employeeSystem.push(newManager)
    console.log(employeeSystem)
    newEmployee()
  })

