const employeesReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_EMPLOYEES":
            state = [...action.payload];
            break;
        case "ADD_EMPLOYEE":
            state = [...state, action.payload];
            break;
    }
    return state;
};

export default employeesReducer;