import { FETCH_LOGIN_SUCCESS, REGISTER_SUCCESS, USER_LOGOUT } from "./type"

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


