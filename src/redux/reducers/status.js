import { IS_LOADING, SUCCESS, ERROR, UPDATE_FIELDSCHANGED, RESET_FIELDSCHANGED } from '../actions/status'

const INITIAL_STATE = {
    isLoading: false,
    success: false,
    error: false,
    fieldsChanged: [], //array will be updated with fields that are changed in any form. This array will acts as reference to find out which all fields need to be sent to database to update
}

export default function status(state = INITIAL_STATE, action) {
    switch (action.type) {
        case IS_LOADING:
            return {
                isLoading: true,
                success: false,
                error: false
            }
        case SUCCESS:
            return {
                isLoading: false,
                success: true,
                error: false
            }
        case ERROR:
            return {
                isLoading: false,
                success: false,
                error: action.payload
            }
        case UPDATE_FIELDSCHANGED:
            return {
                ...state,
                fieldsChanged: [...state.fieldsChanged, action.payload]
            }
        case RESET_FIELDSCHANGED:
            return {
                ...state,
                fieldsChanged: []
            }
        default:
            return state
    }
}