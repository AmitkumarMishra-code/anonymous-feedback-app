import { LOGIN_PROCESS_BEGIN, LOGIN_PROCESS_ERROR, RESET_USER, SET_USER, SET_USERNAME } from "../actions/actions_types";

export default function userReducer(state = { user: null, error: null, inProcess: false, username: null }, action) {
    switch (action.type) {
        case LOGIN_PROCESS_BEGIN:
            return {...state, inProcess: true }
        case SET_USER:
            console.log(action.payload)
            return {...state, user: action.payload, inProcess: false }
        case RESET_USER:
            return {...state, user: null }
        case LOGIN_PROCESS_ERROR:
            return {...state, error: action.payload, inProcess: false }
        case SET_USERNAME:
            return {...state, username: action.payload }
        default:
            return state
    }
}