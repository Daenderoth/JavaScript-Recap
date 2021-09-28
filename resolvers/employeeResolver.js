const Employee = require('../models/employeeModel');

const Query = {
    employees: () => {
        return Employee.find().exec();
    },
    employee: (parent, {name}, context, info) => {
        return Employee.findOne({name: name}).exec();
    }
  }

const Mutation = {
    // POST
    createEmployee: (parent, {name, email, address, hireDate, salary, jobTitle}, context, info) => {

        let employee = new Employee();
        employee.name = name;
        employee.email = email;
        employee.address = address;
        employee.hireDate = hireDate;
        employee.salary = salary;
        employee.jobTitle = jobTitle;

        console.log(employee);

        return employee.save();

        // employee.save((err, emp) => {
        //     if(err){
        //         return err;
        //     }
        //     return emp;
        // });
    },

    // PUT
    updateEmployee: async (parent, {id, name, email, address, hireDate, salary, jobTitle}, context, info) => {
        let emp = await Employee.findById(id).exec();
        name ? emp.name = name : emp.name = emp.name;
        email ? emp.email = email : emp.email = emp.email;
        address ? emp.address = address : emp.address = emp.address;
        hireDate ? emp.hireDate = hireDate : emp.hireDate = emp.hireDate;
        salary ? emp.salary = salary : emp.salary = emp.salary;
        jobTitle ? emp.jobTitle = jobTitle : emp.jobTitle = emp.jobTitle;

        return emp.save();
    },

    // DELETE
    removeEmployee: (parent, {id}, context, info) => {
        return Employee.findByIdAndDelete(id).exec();
    }
}
  
  module.exports = {
    Query,
    Mutation
  }