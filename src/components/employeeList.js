import React, { useState } from 'react';
import { gql, useMutation, useQuery } from "@apollo/client";
import { ADD_EMPLOYEE, EMPLOYEES, REMOVE_EMPLOYEE, PROJECTS, UPDATE_EMPLOYEE} from '../queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';


const EmployeeList = (props) => {

    // Function to be executed when successfully adding an employee
    const updatePageOnCreate = (cache, {data}) => {
        
        const existingEmployees = [...props.employees]
        
        const newEmp = data.createEmployee;
        const newEmpCopy = {...newEmp, project: null};
        console.log(newEmpCopy);
    
        // Updating the UI
        props.setEmployees([...existingEmployees, newEmpCopy]);
        setState({showModal: false, showUpdateModal: false});
    
      };

    // Function to be executed when successfully modifying an employee
    const updatePageOnUpdate = (cache, {data}) => {

        const emp = {...data.updateEmployee};
        let existingEmployees = [...props.employees];
        let empToUpdateIndex = existingEmployees.findIndex(employee => employee.id === emp.id);
        console.log(empToUpdateIndex);

        let updatedEmployees = [...existingEmployees];
        updatedEmployees[empToUpdateIndex] = emp;

        // Updating the UI
        props.setEmployees([...updatedEmployees]); 

        // We also need to update the projects array
        console.log(props.projects)
        console.log(emp)
        console.log(state.employee)

        let oldEmp = {...state.employee};

        let projs = JSON.parse(JSON.stringify(props.projects));

        setState({showModal: false, showUpdateModal: false});

        // Employee had a project before, but was now removed
        if(!emp.project && oldEmp.project)
        {
            projs.forEach((proj) => {
                
                for (const empToDelIndex in proj.employees)
                {
                    if(proj.employees[empToDelIndex].name == emp.name)
                    {
                        proj.employees.splice(empToDelIndex, 1);
                        props.setProjects(projs);
                    }
                }

            });
        }
        // Employee did not have a project before, but now has one
        else if(emp.project && !oldEmp.project)
        {
            let projToUpdateIndex = projs.findIndex(proj => proj.id == emp.project.id);
            console.log(projToUpdateIndex);
            projs[projToUpdateIndex].employees.push({__typename: 'Employee', name: emp.name});
            console.log(projs);
            props.setProjects(projs);
        }

        // Employee already had a project; now has been assigned another one
        else if((emp.project && oldEmp.project) && emp.project.id != oldEmp.project.id)
        {
            // We first remove him from the old one
            projs.forEach((proj) => {
                
                for (const empToDelIndex in proj.employees)
                {
                    if(proj.employees[empToDelIndex].name == emp.name)
                    {
                        proj.employees.splice(empToDelIndex, 1);
                    }
                }

            });
            
            // Then we add him to the new one
            let projToUpdateIndex = projs.findIndex(proj => proj.id == emp.project.id);
            projs[projToUpdateIndex].employees.push({__typename: 'Employee', name: emp.name});
            props.setProjects(projs);
        }

    };

    // Function to be executed when successfully removing an employee
    const updatePageOnDelete = (cache, {data}) => {
    
        const emp = {...data.removeEmployee};
        let existingEmployees = [...props.employees];
        let empToRemoveIndex = existingEmployees.findIndex(employee => employee.id === emp.id);
        console.log(empToRemoveIndex);
        existingEmployees.splice(empToRemoveIndex, 1);

        // Updating the UI
        props.setEmployees([...existingEmployees]);
    };

    // Component state management
    const [state, setState] = React.useState({showModal: false, showUpdateModal: false});

    // Mutation for removing employee
    const [removeEmployee, {data, loading, error}] = useMutation(REMOVE_EMPLOYEE, {update: updatePageOnDelete});

    // Modal component
    const AddEmployeeModal = (props) => {
        let name, email, address, hireDate, salary, jobTitle;
        // Mutation for adding new employee
        const [addEmployee, { data, loading, error }] = useMutation(ADD_EMPLOYEE, {update: updatePageOnCreate, onError: (err) => {
            console.log(err)
        }});
        // if (loading) return 'Submitting...';
        if (error) return `Submission error! ${error.message}`;
    
        return (
            <div id="backdrop" class='modal-backdrop'>
                <form className='employee-form' onSubmit={ e => {
                        e.preventDefault();

                        addEmployee({
                            variables: {
                                createEmployeeName: name.value,
                                createEmployeeEmail: email.value,
                                createEmployeeAddress: address.value,
                                createEmployeeHireDate: hireDate.value,
                                createEmployeeSalary: parseInt(salary.value),
                                createEmployeeJobTitle: jobTitle.value
                            }
                        });
                    }
    
                }>
                    <div class='form-row'>
                        <input type='text' placeholder='Employee Name' ref={ newName => {
                            name = newName;
                        }} autoFocus/>
                    </div>
    
                    <div class='form-row'>
                        <input type='text' placeholder='Employee Email' ref={ newEmail => {
                            email = newEmail;
                        }}/>
                    </div>
    
                    <div class='form-row'>
                        <input type='text' placeholder='Employee Address' ref={ newAddress => {
                            address = newAddress;
                        }}/>
                    </div>
    
                    <div class='form-row'>
                        <label for='hireDate'>Hire Date</label>
                        <input type='date' name='hireDate' placeholder='Employee Hire Date' ref={ newHireDate => {
                            hireDate = newHireDate;
                        }}/>
                    </div>

                    <div class='form-row'>
                        <input type='text' placeholder='Employee Salary' ref={ newSalary => {
                            salary = newSalary;
                        }}/>
                    </div>
    
                    <div class='form-row'>
                        <input type='text' placeholder='Employee Job Title' ref={ newJobTitle => {
                            jobTitle = newJobTitle;
                        }}/>
                    </div>
                        
                    <div class='form-button-container'>
                        <button class='bttn'>
                            Add Employee!
                        </button>  
                    </div>

                </form>
            </div>
        );
    };

    // Update Modal component
    const UpdateEmployeeModal = (props) => {
        
        let name, email, address, hireDate, salary, jobTitle, projectId;
        // Mutation for updating employee
        const [updateEmployee, { data, loading, error }] = useMutation(UPDATE_EMPLOYEE, {update: updatePageOnUpdate, onError: (err) => {
            console.log(err)
        }});
        // if (loading) return 'Submitting...';
        if (error) return `Submission error! ${error.message}`;
    
        return (
            <div id="backdrop" class='modal-backdrop'>
                <form className='employee-form' onSubmit={ e => {
                        e.preventDefault();

                        updateEmployee({
                            variables: {
                                updateEmployeeId: props.employee.id,
                                updateEmployeeName: name.value ? name.value : props.employee.name,
                                updateEmployeeEmail: email.value ? email.value : props.employee.email,
                                updateEmployeeAddress: address.value ? address.value : props.employee.address,
                                updateEmployeeHireDate: hireDate.value ? hireDate.value : props.employee.hireDate,
                                updateEmployeeSalary: salary.value ? parseInt(salary.value) : parseInt(props.employee.salary),
                                updateEmployeeJobTitle: jobTitle.value ? jobTitle.value : props.employee.jobTitle,
                                updateEmployeeProject: projectId.value ? projectId.value : null
                            }
                        });
                    }
    
                }>
                    <div class='form-row'>
                        <input type='text' defaultValue={props.employee.name} placeholder='Employee Name' ref={ newName => {
                            name = newName;
                        }} autoFocus/>
                    </div>
    
                    <div class='form-row'>
                        <input type='text' defaultValue={props.employee.email} placeholder='Employee Email' ref={ newEmail => {
                            email = newEmail;
                        }}/>
                    </div>
    
                    <div class='form-row'>
                        <input type='text' defaultValue={props.employee.address} placeholder='Employee Address' ref={ newAddress => {
                            address = newAddress;
                        }}/>
                    </div>
    
                    <div class='form-row'>
                        <label for='hireDate'>Hire Date</label>
                        <input type='date' name='hireDate' defaultValue={new Date(props.employee.hireDate).toISOString().split('T')[0]} placeholder='Employee Hire Date' ref={ newHireDate => {
                            hireDate = newHireDate;
                        }}/>
                    </div>

                    <div class='form-row'>
                        <input type='text' defaultValue={props.employee.salary} placeholder='Employee Salary' ref={ newSalary => {
                            salary = newSalary;
                        }}/>
                    </div>
    
                    <div class='form-row'>
                        <input type='text' defaultValue={props.employee.jobTitle} placeholder='Employee Job Title' ref={ newJobTitle => {
                            jobTitle = newJobTitle;
                        }}/>
                    </div>

                    <div class='form-row'>
                        <select ref={ newProjectId => {
                            projectId = newProjectId;
                        }}>
                            <option value=''>-</option>

                            {props.projects.map(project => {

                                if(props.employee.project)
                                {
                                    return (<option selected={project.id == props.employee.project.id} value={project.id}>{project.projectName} - {project.projectCode}</option>)
                                }
                                return <option value={project.id}>{project.projectName} - {project.projectCode}</option>
                                
                            })}

                        </select>
                    </div>
                        
                    <div class='form-button-container'>
                        <button class='bttn'>
                            Update Employee!
                        </button>  
                    </div>

                </form>
            </div>
        );
    };

    // render() { 
    return ( 
        <div class="books" onClick={(e) => {
            if(e.target.id === 'backdrop')
            {         
                setState({showModal: false, showUpdateModal: false});
            }
        }}>
            
            { state.showModal ? <AddEmployeeModal setEmployees={props.setEmployees}></AddEmployeeModal> : null }
            { state.showUpdateModal ? <UpdateEmployeeModal projects={props.projects} setEmployees={props.setEmployees} employee={state.employee}></UpdateEmployeeModal> : null }

            <div class="table">

                <div class="header bg-white">
                    <h4 class="header-title">Employees</h4>
                    <div class="header-button-section">
                        <span onClick={() => {setState({showModal: true, showUpdateModal: false});}} class="fa fa-plus bttn bttn-small bttn-add">
                            <FontAwesomeIcon icon={faPlus}/>
                        </span>
                        {/* <button class="bttn bttn-save">SAVE</button> */}
                    </div>
                </div>

                <div class="clear"></div>

                <div class="table-row table-header bg-blue">
                    <div class="cell cell-150p">
                        NAME
                    </div>
                    <div class="cell cell-250p">
                        EMAIL
                    </div>
                    <div class="cell cell-100p">
                        SALARY
                    </div>
                    <div class="cell cell-150p">
                        JOB TITLE
                    </div>
                    <div class="cell cell-100p">
                        PROJECT
                    </div>
                    <div class="cell cell-full">

                    </div>
                    <div class="cell cell-100p">
                        EDIT
                    </div>
                </div>

                {
                    props.employees.map(employee => (
                        <div class="table-row">
                            <div class="cell cell-150p">
                                <span class="clickable-text">{employee.name}</span>
                            </div>
                            <div class="cell cell-250p">
                                <span>{employee.email}</span>
                            </div>
                            <div class="cell cell-100p">
                                <span>{employee.salary}</span>
                            </div>
                            <div class="cell cell-150p">
                                <span>{employee.jobTitle}</span>
                            </div>
                            <div class="cell cell-100p">
                                <span>{employee.project ? employee.project.projectName : ''}</span>
                            </div>
                            <div class="cell cell-full">

                            </div>
                            <div class="cell cell-100p">
                                <span class="fa fa-pencil bttn bttn-small bttn-edit" onClick={() => {setState({showModal: false, showUpdateModal: true, employee: employee})}}>
                                    <FontAwesomeIcon icon={faPencilAlt}/>
                                </span>
                                <span class="fa fa-remove bttn bttn-small bttn-remove" onClick={() => {
                                    removeEmployee({
                                        variables: {
                                            removeEmployeeId: employee.id,
                                        }
                                    });
                                }}>
                                    <FontAwesomeIcon icon={faEraser}/>
                                </span>
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
        );
    }
// }

// POST

 
export default EmployeeList;