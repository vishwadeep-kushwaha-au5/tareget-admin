import api from '../../utils/api';
import { isLoading, success, error } from './status';

export const SETH_AUTH = "SETH_AUTH"
export const REMOVE_AUTH = "REMOVE_AUTH"

export const register = (data) => async (dispatch, getState) => {
    dispatch(isLoading())
    api.post('/api/user/signup', data).then(res => {
        dispatch(success())
        dispatch({
            type: SETH_AUTH,
            payload: {
                data: res.data
            }
        })
    }).catch(err => {
        dispatch(error(err.response.data))
    })
}


export const login = (data) => async (dispatch, getState) => {
    dispatch(isLoading())
    api.post(process.env.REACT_APP_USER_LOGIN, data).then(res => {
        dispatch(success())
        dispatch({
            type: SETH_AUTH,
            payload: {
                data: res.data
            }
        })
    }).catch(err => {
        dispatch(error(err.response.data))
    })
}

export const logout = () => async (dispatch,) => {
    dispatch(isLoading())
    dispatch({
        type: REMOVE_AUTH
    })
}
