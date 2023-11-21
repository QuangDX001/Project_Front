import { combineReducers } from "redux";
import userReducer from "./userReducer";
import statusReducer from "./statusReducer";

const rootReducer = combineReducers({
    user: userReducer,
    status: statusReducer,
})

export default rootReducer;
