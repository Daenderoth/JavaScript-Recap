const userReducer = (state = {username: null, token: null, isAdmin: false}, action) => {
    switch(action.type) {
        case "SET_TOKEN":
            state = {
                ...state,
                token: action.payload
            }
            break;
        case "SET_USERNAME":
            state = {
                ...state,
                username: action.payload
            };
            break;
        case "GIVE_ADMIN_RIGHTS":
            state = {
                ...state,
                isAdmin: true
            };
            break;
        case "LOGOUT":
            localStorage.removeItem('token');
            state = {
                username: null, 
                token: null, 
                isAdmin: false
            };
            break;
    }
    return state;
};

export default userReducer;