import { FETCH_LOGIN_SUCCESS, REGISTER_SUCCESS, UPDATE_STATUS, USER_LOGOUT } from "./type"

export const doLogin = (data) => {
    return {
        type: FETCH_LOGIN_SUCCESS,
        payload: data
    }
}

export const doLogOut = () => {
    return {
        type: USER_LOGOUT,
    }
}

export const doSignup = (dataSignup) => {
    return {
        type: REGISTER_SUCCESS,
        payload: dataSignup,
    }
}

export const updateUser = (data) => {
    return {
        type: UPDATE_STATUS,
        payload: data,
    }
}


