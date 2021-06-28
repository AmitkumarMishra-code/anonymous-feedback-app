import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import messageReducer from "./reducers/messageReducer";
import signupReducer from "./reducers/signupReducer";
import userReducer from "./reducers/userReducer";

let rootReducer = combineReducers({ signupState: signupReducer, user: userReducer, messages: messageReducer })

export const store = createStore(rootReducer, applyMiddleware(thunk))