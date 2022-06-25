export const IS_LOADING = "IS_LOADING"
export const SUCCESS = "SUCCESS"

export const ERROR = "ERROR"

export const UPDATE_FIELDSCHANGED = "UPDATE_FIELDSCHANGED"
export const RESET_FIELDSCHANGED = "RESET_FIELDSCHANGED"

export const isLoading = (data) => {
    return ({
        type: IS_LOADING
    })
}

export const success = (data) => {
    return ({
        type: SUCCESS
    })
}

export const error = (data) => {
    return ({
        type: ERROR,
        payload: data
    })
}

export const updateFieldsChanged = (fieldName) => (dispatch, getState) => {
    return({
        type: UPDATE_FIELDSCHANGED,
        payload: fieldName
    })
} 

export const reestFieldsChanged = (data) => (dispatch, getState) => {
    return({
        type: RESET_FIELDSCHANGED,
    })
} 