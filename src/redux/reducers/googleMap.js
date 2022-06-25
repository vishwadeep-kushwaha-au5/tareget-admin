import { SET_MAP_LOADED, UNSET_MAP_LOADED } from '../actions/googleMap'

const INITIAL_STATE = {
    mapLoaded: false,
}

export default function auth(state = INITIAL_STATE, action) {

    switch (action.type) {
        case SET_MAP_LOADED:
            return {
                ...state,
                mapLoaded: true
            }
        case UNSET_MAP_LOADED:
            return {
                ...state,
                mapLoaded: false
            }
        default:
            return state
    }
}