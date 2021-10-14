export function setProjects(projects) {
    return {
        type: "SET_PROJECTS",
        payload: projects
    };
}

export function addProject(project) {
    return {
        type: "ADD_PROJECT",
        payload: project
    };
}