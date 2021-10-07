import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from "@apollo/client";
import './index.css';

// Queries
import { EMPLOYEES, PROJECTS, ADD_EMPLOYEE } from './queries';
import Navbar from './components/navbar';
import EmployeeList from './components/employeeList';
import ProjectList from './components/projectList';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

// GET
const GetEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const { loading, error, data } = useQuery(EMPLOYEES, {onCompleted: () => {
        setEmployees(data.employees);
    }});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <EmployeeList employees={employees} setEmployees={setEmployees}></EmployeeList>
    )
}

const GetProjects = () => {
    const [projects, setProjects] = useState([]);
    const { loading, error, data } = useQuery(PROJECTS, {onCompleted: () => {
        setProjects(data.projects);
    }});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <ProjectList projects={projects} setProjects={setProjects}></ProjectList>
    )
}

const App = () => {

    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);

    const GetEmployees = () => {
        const { loading, error, data } = useQuery(EMPLOYEES, {onCompleted: () => {
            setEmployees(data.employees);
        }});
    }

    const GetProjects = () => {
        const { loading, error, data } = useQuery(PROJECTS, {onCompleted: () => {
            setProjects(data.projects);
        }});
    }

    GetEmployees();
    GetProjects();

    return (
        <Switch>
            <Route path='/projects'>
                <ProjectList projects={projects} setProjects={setProjects} setEmployees={setEmployees} employees={employees}></ProjectList>
            </Route>
            <Route path='/'>
                <EmployeeList employees={employees} setEmployees={setEmployees} setProjects={setProjects} projects={projects}></EmployeeList>
            </Route>
        </Switch>
    );
}


ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <Route>
            <div>
                <Navbar/>
                <App></App>
            </div>
            </Route>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);