import { FETCH_LOGIN_SUCCESS, REGISTER_SUCCESS, USER_LOGOUT } from '../action/type'

const INITIAL_STATE = {
    account: {
        id: "",
        username: "",
        email: "",
        token: "",
        roles: "",
    },
    isAuthenticated: false,
}


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_LOGIN_SUCCESS:
            //console.log(">>>action: ", action);
            return {
                ...state,
                account: {
                    id: action?.payload?.data?.userDto?.id,
                    username: action?.payload?.data?.userDto?.username,
                    email: action?.payload?.data?.userDto?.email,
                    roles: action?.payload?.data?.roles,
                    token: action?.payload?.data?.token,
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
                },
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

export default userReducer