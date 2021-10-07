const mongoose = require('mongoose');
const Employee = require('../models/employeeModel');
const Project = require('../models/projectModel');

const Query = {

    // Employees
    employees: () => {
        return Employee.find().populate('project').exec();
    },
    employee: (parent, {name}, context, info) => {
        return Employee.findOne({name: name}).populate('project').exec();
    },

    // Projects
    projects: () => {
        return Project.find().populate('employees').exec();
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
    updateEmployee: async (parent, {id, name, email, address, hireDate, salary, jobTitle, project}, context, info) => {
        let emp = await Employee.findById(id).exec();
        name ? emp.name = name : emp.name = emp.name;
        email ? emp.email = email : emp.email = emp.email;
        address ? emp.address = address : emp.address = emp.address;
        hireDate ? emp.hireDate = hireDate : emp.hireDate = emp.hireDate;
        salary ? emp.salary = salary : emp.salary = emp.salary;
        jobTitle ? emp.jobTitle = jobTitle : emp.jobTitle = emp.jobTitle;

        let projToDelete = emp.project;

        project ? emp.project = project : emp.project = null;

        if(project) {
            if(emp.project != projToDelete)
            {
                await Project.findByIdAndUpdate(projToDelete, {$pull: {employees: id}}).exec();
            }
            
            await Project.findByIdAndUpdate(project, {$addToSet: {employees: id}}, {new: true}).exec();
        }
        else
        {
            let test = await Project.findByIdAndUpdate(projToDelete, {$pull: {employees: id}}).exec();
            console.log(test);
        }

        return emp.save().then((doc) => {
            return Employee.findById(id).populate('project').exec();
        });
    },

    // DELETE
    removeEmployee: (parent, {id}, context, info) => {
        return Employee.findByIdAndDelete(id).exec();
    },

    // Project mutations

    // POST
    createProject: (parent, {projectName, startDate, plannedEndDate, description, projectCode}, context, info) => {

        let project = new Project();
        project.projectName = projectName;
        project.startDate = startDate;
        project.plannedEndDate = plannedEndDate;
        project.description = description;
        project.projectCode = projectCode;

        console.log(project);

        return project.save();

        // project.save((err, proj) => {
        //     if(err){
        //         return err;
        //     }
        //     return proj;
        // });
    },

    // PUT
    updateProject: async (parent, {id, projectName, startDate, plannedEndDate, description, projectCode, employees}, context, info) => {
        
        let proj;
        
        if(employees)
        {
            proj = await Project.findByIdAndUpdate(id, {$addToSet: {'employees': {$each: employees}}}).exec();
            
            if(Array.isArray(employees)) // We must also add the project to the employee document, for each employee
            {
                employees.forEach(async (employee) => {
                    await Employee.findByIdAndUpdate(employee, {project: id}).exec();
                });

                // This is faster but does not work correctly for some reason. :(
                // await Employee.updateMany({'_id': {$in: employees}}, {project: id}).exec();
            }
            else
            {
                await Employee.findByIdAndUpdate(employees, {project: id}).exec();
            }

            console.log(proj);
        }

        else 
        {
            proj = await Project.findById(id).exec();
        }

        projectName ? proj.projectName = projectName : proj.projectName = proj.projectName;
        startDate ? proj.startDate = startDate : proj.startDate = proj.startDate;
        plannedEndDate ? proj.plannedEndDate = plannedEndDate : proj.plannedEndDate = proj.plannedEndDate;
        description ? proj.description = description : proj.description = proj.description;
        projectCode ? proj.projectCode = projectCode : proj.projectCode = proj.projectCode;

        return proj.save().then(newProj => {
            return Project.findById(id).populate('employees').exec();
        });
        
    },

    // DELETE
    removeProject: async (parent, {id}, context, info) => {

        // This worked in case an employee could have more than one project at a time
        // return Employee.updateMany({}, {$pull: {projects: id}}).exec();

        await Employee.updateMany({project: id}, {$unset: {project: 1}}).exec();
        return Project.findByIdAndRemove(id).exec();
    }
}
  
  module.exports = {
    Query,
    Mutation
  }