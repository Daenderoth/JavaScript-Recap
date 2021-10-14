import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import { useQuery} from "@apollo/client";
import { connect } from "react-redux";
import { isExpired, decodeToken } from 'react-jwt';

import { EMPLOYEES, PROJECTS } from './queries';

import { setEmployees, addEmployee } from "./actions/employeesActions";
import { setProjects, addProject } from "./actions/projectsActions";
import { giveAdminRights, logout, setToken, setUsername } from "./actions/userActions";

import EmployeeList from './components/employeeList';
import ProjectList from './components/projectList';
import Login from './components/login';
import Navbar from './components/navbar';
import Registration from './components/registration';

const App = (props) => {

    const GetEmployees = () => {
        let headers = { "Authorization": "Bearer " + props.user.token };
        const { loading, error, data } = useQuery(EMPLOYEES, {context: {
            headers
        }, onCompleted: () => {
            props.setEmployees(data.employees);
        }});
    }

    const GetProjects = () => {
        let headers = { "Authorization": "Bearer " + props.user.token };
        const { loading, error, data } = useQuery(PROJECTS, {context: {
            headers
        }, onCompleted: () => {
            console.log(data)
            props.setProjects(data.projects);
        }, onError: (err) => {
            console.log(err)
        }
    });
    }

    if(!props.user.token)
    {
        if(isExpired(localStorage.getItem('token')) && localStorage.getItem('token'))
        {
            return (
                <div>
                    <Navbar user={props.user}/>
                    <Login setUsername={props.setUsername} setToken={props.setToken} giveAdminRights={props.giveAdminRights} tokenExpiredMessage='Session has expired. Please login again.'></Login>
                </div>
            )
        }
        else if (localStorage.getItem('token'))
        {
            let token = localStorage.getItem('token');
            let decoded = decodeToken(token);
            if(decoded.role === 'admin') props.giveAdminRights();
            props.setToken(token);
        }
        else {
            return (
                <div>
                    <Navbar user={props.user}/>
                    <Login setUsername={props.setUsername} setToken={props.setToken} giveAdminRights={props.giveAdminRights}></Login>
                </div>
            )
        }
    }

    if(props.user.token)
    {   
        GetEmployees();
        GetProjects();
    
        return (
            <div>
                <Navbar user={props.user} logout={props.logout}/>
                <Switch>
                    { props.user.isAdmin ? 
                        <Route path='/register'>
                            <Registration user={props.user}></Registration>
                        </Route>   
                        : null 
                    }
                    <Route path='/projects'>
                        <ProjectList user={props.user} projects={props.projects} setProjects={props.setProjects} setEmployees={props.setEmployees} employees={props.employees} addProject={props.addProject}></ProjectList>
                    </Route>
                    <Route path='/'>
                        <EmployeeList user={props.user} employees={props.employees} setEmployees={props.setEmployees} setProjects={props.setProjects} projects={props.projects} addEmployee={props.addEmployee}></EmployeeList>
                    </Route>
                </Switch>
            </div>
        );
    }

    return (<Navbar user={props.user}></Navbar>)

}

// Redux stuff

const mapStateToProps = (state) => {
    return {
        employees: state.employees,
        projects: state.projects,
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEmployees: (employees) => {
            dispatch(setEmployees(employees));
        },
        addEmployee: (employee) => {
            dispatch(addEmployee(employee));
        },
        setProjects: (projects) => {
            dispatch(setProjects(projects));
        },
        addProject: (project) => {
            dispatch(addProject(project));
        },
        setToken: (token) => {
            dispatch(setToken(token));
        },
        setUsername: (username) => {
            dispatch(setUsername(username));
        },
        giveAdminRights: () => {
            dispatch(giveAdminRights());
        },
        logout: () => {
            dispatch(logout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);