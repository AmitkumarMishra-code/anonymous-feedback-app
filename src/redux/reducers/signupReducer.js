import { BEGIN_SIGNUP_PROCESS, SIGNUP_PROCESS_ERROR, SIGNUP_PROCESS_SUCCESS } from "../actions/actions_types";

export default function signupReducer(state = { inProcess: false, error: null, success: false }, action) {
    switch (action.type) {
        case BEGIN_SIGNUP_PROCESS:
            return {...state, inProcess: true }
        case SIGNUP_PROCESS_SUCCESS:
            return {...state, inProcess: false, success: true }
        case SIGNUP_PROCESS_ERROR:
            return {...state, error: action.payload }
        default:
            return state
    }
}