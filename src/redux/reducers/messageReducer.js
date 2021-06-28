import { BEGIN_LOADING_MESSAGES, ERROR_LOADING_MESSAGES, SUCCESS_LOADING_MESSAGES } from "../actions/actions_types";

export default function messageReducer(state = { messages: [], isLoading: false, error: null }, action) {
    switch (action.type) {
        case BEGIN_LOADING_MESSAGES:
            return {...state, isLoading: true }
        case SUCCESS_LOADING_MESSAGES:
            return {...state, isLoading: false, messages: action.payload }
        case ERROR_LOADING_MESSAGES:
            return {...state, isLoading: false, error: action.payload }
        default:
            return state
    }
}