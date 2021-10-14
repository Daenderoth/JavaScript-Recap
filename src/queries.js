import { gql } from "@apollo/client";

// QUERIES
const EMPLOYEES = gql`
    query GetEmployees {
            employees {
                id
                name
                email
                address
                hireDate
                salary
                jobTitle
                project {
                    id
                    projectName
                }
            }
        }
    `;

const PROJECTS = gql`
    query Query {
        projects {
            id
            projectName
            startDate
            plannedEndDate
            description
            projectCode
            employees {
                name
            }
        }
    }`;

// MUTATIONS
const ADD_EMPLOYEE = gql`
    mutation CreateEmployeeMutation($createEmployeeName: String, $createEmployeeEmail: String, $createEmployeeAddress: String, $createEmployeeHireDate: DateTime, $createEmployeeSalary: Int, $createEmployeeJobTitle: String, $project: String) {
        createEmployee(name: $createEmployeeName, email: $createEmployeeEmail, address: $createEmployeeAddress, hireDate: $createEmployeeHireDate, salary: $createEmployeeSalary, jobTitle: $createEmployeeJobTitle, project: $project) {
            id
            name
            email
            address
            hireDate
            salary
            jobTitle
            project {
                id
                projectName
            }
        }
    }
`;

const UPDATE_EMPLOYEE = gql`
    mutation UpdateEmployeeMutation($updateEmployeeId: String, $updateEmployeeAddress: String, $updateEmployeeName: String, $updateEmployeeEmail: String, $updateEmployeeHireDate: DateTime, $updateEmployeeSalary: Int, $updateEmployeeJobTitle: String, $updateEmployeeProject: String) {
        updateEmployee(id: $updateEmployeeId, address: $updateEmployeeAddress, name: $updateEmployeeName, email: $updateEmployeeEmail, hireDate: $updateEmployeeHireDate, salary: $updateEmployeeSalary, jobTitle: $updateEmployeeJobTitle, project: $updateEmployeeProject) {
            name
            email
            address
            hireDate
            salary
            id
            jobTitle
            project {
                id
                projectName
                projectCode
                description
                startDate
                plannedEndDate
            }
        }
    }
`;

const REMOVE_EMPLOYEE = gql`
    mutation RemoveEmployeeMutation($removeEmployeeId: String) {
        removeEmployee(id: $removeEmployeeId) {
            id
            name
        }
    }
`;

// Projects
const ADD_PROJECT = gql`
    mutation CreateProjectMutation($createProjectProjectName: String, $createProjectStartDate: DateTime, $createProjectPlannedEndDate: DateTime, $createProjectDescription: String, $createProjectProjectCode: String) {
        createProject(projectName: $createProjectProjectName, startDate: $createProjectStartDate, plannedEndDate: $createProjectPlannedEndDate, description: $createProjectDescription, projectCode: $createProjectProjectCode) {
            id
            projectName
            startDate
            plannedEndDate
            description
            projectCode
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation Mutation($updateProjectId: String, $updateProjectProjectCode: String, $updateProjectProjectName: String, $updateProjectStartDate: DateTime, $updateProjectPlannedEndDate: DateTime, $updateProjectDescription: String) {
        updateProject(id: $updateProjectId, projectCode: $updateProjectProjectCode, projectName: $updateProjectProjectName, startDate: $updateProjectStartDate, plannedEndDate: $updateProjectPlannedEndDate, description: $updateProjectDescription) {
            id
            projectName
            startDate
            plannedEndDate
            description
            projectCode
            employees {
                name
            }
        }
    }
`;

const REMOVE_PROJECT = gql`
    mutation RemoveProjectMutation($removeProjectId: String) {
        removeProject(id: $removeProjectId) {
            id
            projectName
            startDate
            plannedEndDate
            description
            projectCode
            employees {
                name  
            }
        }
    }
`;

// AUTH 
const REGISTER_USER = gql`
    mutation RegisterMutation($username: String!, $email: String!, $password: String!, $role: String) {
        register(username: $username, email: $email, password: $password, role: $role) {
            message
            statusCode
        }
    }
`;

const AUTHENTICATE_USER = gql`
    mutation AuthenticateMutation($authenticateEmail: String!, $authenticatePassword: String!) {
        authenticate(email: $authenticateEmail, password: $authenticatePassword)
        }
`;


export {EMPLOYEES, PROJECTS, ADD_EMPLOYEE, REMOVE_EMPLOYEE, UPDATE_EMPLOYEE, ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT, REGISTER_USER, AUTHENTICATE_USER};