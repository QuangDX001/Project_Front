import { UPDATE_STATUS } from "../action/type";

const STATUS_STATE = {
    userStatus: {
        id: "",
        roles: "",
        enable: "",
    },
    isAuthenticated: "",
}

const statusReducer = (state = STATUS_STATE, action) => {
    switch (action.type) {
        case UPDATE_STATUS:
            //console.log(">>>action: ", action);
            return {
                ...state,
                userStatus: {
                    id: action?.payload?.data?.id,
                    enable: action?.payload?.data?.enable,
                    roles: action?.payload?.data?.roles,
                },
                isAuthenticated: false,
            }
        default:
            return state
    }
}

export default statusReducer