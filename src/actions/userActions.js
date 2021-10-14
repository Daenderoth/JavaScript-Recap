export function setToken(token) {
    return {
        type: "SET_TOKEN",
        payload: token
    };
}

export function setUsername(username) {
    return {
        type: "SET_USERNAME",
        payload: username
    };
}

export function giveAdminRights() {
    return {
        type: "GIVE_ADMIN_RIGHTS",
        payload: true
    };
}

export function logout() {
    return {
        type: "LOGOUT"
    }
}