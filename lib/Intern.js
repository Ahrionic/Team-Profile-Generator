// Inherits from employee and defines/exports intern

const Employee = require('./Employee.js')

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email)
    this.school = school
  }
  getName() {
    return this.name
  }
  getId() {
    return this.id
  }
  getEmail() {
    return this.email
  }
  getRole() {
    return 'Intern'
  }
  getSchool() {
    return this.school
  }

}

module.exports = Intern