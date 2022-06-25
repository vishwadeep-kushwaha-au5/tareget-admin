import axios from 'axios';
import { isLoading, success, error } from './status';

export const SET_MAP_LOADED = "SET_MAP_LOADED"
export const UNSET_MAP_LOADED = "UNSET_MAP_LOADED"

export const setMapLoaded = (data) => async (dispatch, getState) => {
    dispatch(isLoading())
    dispatch({type: SET_MAP_LOADED})
}


export const unsetMapLoaded = (data) => async (dispatch, getState) => {
    dispatch(isLoading())
    dispatch({type: UNSET_MAP_LOADED})
}
