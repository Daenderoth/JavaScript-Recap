const projectsReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_PROJECTS":
            state = [...action.payload];
            break;
        case "ADD_PROJECT":
            state = [...state, action.payload];
            break;
    }
    return state;
};

export default projectsReducer;