import { FETCH_LOGIN_SUCCESS, REGISTER_SUCCESS, USER_LOGOUT } from '../action/type'

const INITIAL_STATE = {
    account: {
        id: "",
        username: "",
        email: "",
        token: "",
        roles: "",
        enable: "",
    },
    isAuthenticated: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_LOGIN_SUCCESS:

            return {
                ...state,
                account: {
                    id: action?.payload?.data?.userDto?.id,
                    username: action?.payload?.data?.userDto?.username,
                    email: action?.payload?.data?.userDto?.email,
                    roles: action?.payload?.data?.roles,
                    token: action?.payload?.data?.token,
                    enable: action?.payload?.data?.userDto?.enable,
                },
                isAuthenticated: true,
            };
        case REGISTER_SUCCESS:

            return {
                ...state,
                account: {
                    id: action?.payload?.dataSignup?.id,
                    username: action?.payload?.dataSignup?.username,
                    password: action?.payload?.dataSignup?.password,
                    email: action?.payload?.dataSignup?.email,
                    roles: action?.payload?.dataSignup?.roles,
                    enable: action?.payload?.dataSignup?.enable,
                },
                isAuthenticated: false,
            };
        case USER_LOGOUT:
            return {
                ...state,
                account: {
                    id: "",
                    username: "",
                    email: "",
                    token: "",
                    roles: "",
                    enable: "",
                },
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

export default userReducer 