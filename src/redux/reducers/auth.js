import { SETH_AUTH, REMOVE_AUTH } from '../actions/auth'

const INITIAL_STATE = {
    user: null,
}

export default function auth(state = INITIAL_STATE, action) {

    switch (action.type) {
        case SETH_AUTH:
            return {
                ...state,
                user: action.payload.data
            }
        case REMOVE_AUTH:
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}