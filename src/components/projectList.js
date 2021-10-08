import React from 'react';
import { gql, useMutation, useQuery } from "@apollo/client";
import { REMOVE_PROJECT, ADD_PROJECT, UPDATE_PROJECT, EMPLOYEES } from '../queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons'

const ProjectList = (props) => {

    // Function to be executed when successfully adding a project
    const updatePageOnCreate = (cache, {data}) => {
        
        const existingProjects = [...props.projects]
        
        const newProj = data.createProject;
        const newProjCopy = {...newProj, employees: []};
        console.log(newProjCopy);
    
        // Updating the UI
        props.setProjects([...existingProjects, newProjCopy]);
        setState({showModal: false, showUpdateModal: false});
    
      };

    // Function to be executed when successfully removing a project
    const updatePageOnDelete = (cache, {data}) => {

        const proj = {...data.removeProject};
        let existingProjects = [...props.projects];
        let projToRemoveIndex = existingProjects.findIndex(project => project.id === proj.id);
        existingProjects.splice(projToRemoveIndex, 1);

        // Updating the UI
        props.setProjects([...existingProjects]);

        // Also need to update the employees
        let emps = JSON.parse(JSON.stringify(props.employees));
        for (const index in emps)
        {
            if(emps[index].project)
            {
                if(emps[index].project.id == proj.id)
                {
                    emps[index].project = null;
                }
            }
        }
        props.setEmployees(emps);
    };

    // Function to be executed when successfully modifying a project
    const updatePageOnUpdate = (cache, {data}) => {

        const proj = {...data.updateProject};
        let existingProjects = [...props.projects];
        let projToUpdateIndex = existingProjects.findIndex(project => project.id === proj.id);
        console.log(projToUpdateIndex);

        let updatedProjects = [...existingProjects];
        updatedProjects[projToUpdateIndex] = proj;

        // Updating the UI
        props.setProjects([...updatedProjects]);
        setState({showModal: false, showUpdateModal: false});
    };

    // Component state management
    const [state, setState] = React.useState({showModal: false, showUpdateModal: false});

    // Mutation for removing project
    const [removeProject, {data, loading, error}] = useMutation(REMOVE_PROJECT, {update: updatePageOnDelete});

    // Modal component
    const AddProjectModal = (props) => {
        let projectName, startDate, plannedEndDate, description, projectCode;
        // Mutation for adding new employee
        const [addProject, { data, loading, error }] = useMutation(ADD_PROJECT, {update: updatePageOnCreate, onError: (err) => {
            console.log(err)
        }});
        // if (loading) return 'Submitting...';
        if (error) return `Submission error! ${error.message}`;
    
        return (
            <div id="backdrop" class='modal-backdrop'>
                <form className='employee-form' onSubmit={ e => {
                        e.preventDefault();

                        addProject({
                            variables: {
                                createProjectProjectName: projectName.value,
                                createProjectStartDate: startDate.value,
                                createProjectPlannedEndDate: plannedEndDate.value,
                                createProjectDescription: description.value,
                                createProjectProjectCode: projectCode.value
                            }
                        });
                    }
    
                }>
                    <div class='form-row'>
                        <input type='text' placeholder='Project Name' ref={ newName => {
                            projectName = newName;
                        }} autoFocus/>
                    </div>
    
                    <div class='form-row'>
                        <label for='start'>Project Start Date</label>
                        <input type='date' name="start" placeholder='Project Start Date' ref={ newStartDate => {
                            startDate = newStartDate;
                        }}/>
                    </div>
    
                    <div class='form-row'>
                        <label for='end'>Project End Date</label>
                        <input type='date' name='end' placeholder='Project End Date' ref={ newEndDate => {
                            plannedEndDate = newEndDate;
                        }}/>
                    </div>
    
                    <div class='form-row'>
                        <input type='text' placeholder='Project Description' ref={ newDescription => {
                            description = newDescription;
                        }}/>
                    </div>

                    <div class='form-row'>
                        <input type='text' placeholder='Project Code' ref={ newProjectCode => {
                            projectCode = newProjectCode;
                        }}/>
                    </div>
                        
                    <div class='form-button-container'>
                        <button class='bttn'>
                            Add Project!
                        </button>  
                    </div>

                </form>
            </div>
        );
    };

    // Update Modal component
    const UpdateProjectModal = (props) => {
        let projectName, startDate, plannedEndDate, description, projectCode;

        // Mutation for updating project
        const [updateProject, { data, loading, error }] = useMutation(UPDATE_PROJECT, {update: updatePageOnUpdate, onError: (err) => {
            console.log(err)
        }});

        // if (loading) return 'Submitting...';
        if (error) return `Submission error! ${error.message}`;
    
        return (
            <div id="backdrop" class='modal-backdrop'>
                <form className='employee-form' onSubmit={ e => {
                        e.preventDefault();

                        updateProject({
                            variables: {
                                updateProjectId: props.project.id,
                                updateProjectProjectName: projectName.value ? projectName.value : props.project.projectName,
                                updateProjectStartDate: startDate.value ? startDate.value : props.project.startDate,
                                updateProjectPlannedEndDate: plannedEndDate.value ? plannedEndDate.value : props.project.plannedEndDate,
                                updateProjectDescription: description.value ? description.value : props.project.description,
                                updateProjectProjectCode: projectCode.value ? projectCode.value : props.project.projectCode
                            }
                        });
                    }
    
                }>
                    <div class='form-row'>
                        <input type='text' defaultValue={state.project.projectName} placeholder='Project Name' ref={ newName => {
                            projectName = newName;
                        }} autoFocus/>
                    </div>
    
                    <div class='form-row'>
                        <label for='start'>Project Start Date</label>
                        <input type='date' name="start" defaultValue={new Date(props.project.startDate).toISOString().split('T')[0]} placeholder='Project Start Date' ref={ newStartDate => {
                            startDate = newStartDate;
                        }}/>
                    </div>
    
                    <div class='form-row'>
                        <label for='end'>Project End Date</label>
                        <input type='date' name='end' defaultValue={new Date(props.project.plannedEndDate).toISOString().split('T')[0]} placeholder='Project End Date' ref={ newEndDate => {
                            plannedEndDate = newEndDate;
                        }}/>
                    </div>
    
                    <div class='form-row'>
                        <input type='text' defaultValue={props.project.description} placeholder='Project Description' ref={ newDescription => {
                            description = newDescription;
                        }}/>
                    </div>

                    <div class='form-row'>
                        <input type='text' defaultValue={props.project.projectCode} placeholder='Project Code' ref={ newProjectCode => {
                            projectCode = newProjectCode;
                        }}/>
                    </div>
                        
                    <div class='form-button-container'>
                        <button class='bttn'>
                            Update Project!
                        </button>  
                    </div>

                </form>
            </div>
        );
    };
    
    return ( 
        <div class="books" onClick={(e) => {
            if(e.target.id === 'backdrop')
            {         
                setState({showModal: false, showUpdateModal: false});
            }
        }}>

            { state.showModal ? <AddProjectModal setProjects={props.setProjects}></AddProjectModal> : null }
            { state.showUpdateModal ? <UpdateProjectModal setProjects={props.setProjects} project={state.project}></UpdateProjectModal> : null }

            <div class="table">

                <div class="header bg-white">
                    <h4 class="header-title">Projects</h4>
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
                    <div class="cell cell-150p">
                        START DATE
                    </div>
                    <div class="cell cell-150p">
                        END DATE
                    </div>
                    <div class="cell cell-150p">
                        DESCRIPTION
                    </div>
                    <div class="cell cell-250p">
                        PROJECT CODE
                    </div>
                    <div class="cell cell-150p">
                        EMPLOYEES
                    </div>
                    <div class="cell cell-full">

                    </div>
                    <div class="cell cell-100p">
                        EDIT
                    </div>
                </div>

                {
                    props.projects.map(project => (
                        <div class="table-row">
                            <div class="cell cell-150p">
                                <span class="clickable-text">{project.projectName}</span>
                            </div>
                            <div class="cell cell-150p">
                                <span>{new Date(project.startDate).toLocaleDateString()}</span>
                            </div>
                            <div class="cell cell-150p">
                                <span>{new Date(project.plannedEndDate).toLocaleDateString()}</span>
                            </div>
                            <div class="cell cell-150p">
                                <span>{project.description}</span>
                            </div>
                            <div class="cell cell-250p">
                                <span>{project.projectCode}</span>
                            </div>
                            <div class="cell cell-150p">
                                {
                                    !project.employees ? null : project.employees.map((employee) => (
                                        <span>
                                            {employee==project.employees[project.employees.length-1] ? employee.name : employee.name + ', '}
                                        </span>
                                    )) 
                                }
                            </div>
                            <div class="cell cell-full">

                            </div>
                            <div class="cell cell-100p">
                                <span class="fa fa-pencil bttn bttn-small bttn-edit" onClick={() => {
                                    setState({showModal: false, showUpdateModal: true, project: project});
                                }}>
                                    <FontAwesomeIcon icon={faPencilAlt}/>
                                </span>
                                <span class="fa fa-remove bttn bttn-small bttn-remove" onClick={() => {
                                    removeProject({
                                        variables: {
                                            removeProjectId: project.id
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
 
export default ProjectList;