import {createStore, combineReducers} from "redux";
import employeesReducer from "./reducers/employeesReducer";
import projectsReducer from "./reducers/projectsReducer";
import userReducer from "./reducers/userReducer";

export default createStore(
    combineReducers({
        employees: employeesReducer,
        projects: projectsReducer,
        user: userReducer
    }),
    {}
);