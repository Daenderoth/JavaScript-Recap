export function setEmployees(employees) {
    return {
        type: "SET_EMPLOYEES",
        payload: employees
    };
}

export function addEmployee(employee) {
    return {
        type: "ADD_EMPLOYEE",
        payload: employee
    };
}