import api from '../../utils/api'
import { validateFields } from '../../utils/validator'
import { getKeyValueObjectFromReduxObject } from '../../utils/helper'

window.validateFields = validateFields
export const UPDATE_DRIVER_FIELD = "UPDATE_DRIVER_FIELD"
export const UPDATE_DRIVER_ERROR = "UPDATE_DRIVER_ERROR"
export const SET_DRIVER_LIST = "SET_DRIVER_LIST"
export const SET_DRIVER = "SET_DRIVER"
export const SET_SUBMIT_DRIVER_FLAG = "SET_SUBMIT_DRIVER_FLAG"


export const updateDriverField = (inputName, input) => (dispatch, getState) => {
    console.log(input)
    let validationType = input.validationType
    if(input.required && Object.getPrototypeOf(input) !== Object.prototype){
        //check if empty
        input["validation"] = validateFields.validateEmpty(input.value);
        if(!input["validation"])
            input["validation"] = window["validateFields"][validationType](input.value);
    }
    else{ 
        //validate field
        input["validation"] = window["validateFields"][validationType](input.value);
    }

    if(!input["validation"]){
        dispatch({
            type: UPDATE_DRIVER_FIELD,
            payload: input,
            inputName: inputName
        })
    }else{
        dispatch({
            type: UPDATE_DRIVER_ERROR,
            payload: input,
            inputName: inputName
        })
    }

    // return ({
    //     type: IS_LOADING,
    // })
}


export const submitDriver = (data) => (dispatch, getState) => {
    dispatch({type: SET_SUBMIT_DRIVER_FLAG, payload: 'submitting'})
    if(Object.values(data).every(curr => curr.validation === false )){
        api.post(process.env.REACT_APP_NEW_DRIVER,getKeyValueObjectFromReduxObject(data)).then(res=>{
            dispatch({type: SET_SUBMIT_DRIVER_FLAG, payload: 'Done'})
            console.log("Done")
        }).catch(err=>{
            dispatch({type: SET_SUBMIT_DRIVER_FLAG, payload: false})
            console.log("err", err)
        })
    }else{
        dispatch({type: SET_SUBMIT_DRIVER_FLAG, payload: false})
        console.log("NONONO")
    }
}

export const updateDriver = (data) => (dispatch, getState) => {
    if(data // 👈 null and undefined check
    && Object.keys(data).length !== 0
    && Object.getPrototypeOf(data) === Object.prototype){
        api.put(process.env.REACT_APP_UPDATE_DRIVER, data).then(res=>{
            console.log("Done")
        }).catch(err=>{
            console.log("err", err)
        })
    }else{
        console.log("NONONO")
    }
}

export const getAvailableDrivers = () => (dispatch, getstate) => {
    api.get(process.env.REACT_APP_GET_AVAILABLE_DRIVERS).then(res=>{
        if(res.statusText === 'OK' && res.data.result?.length){
            dispatch({
                type: SET_DRIVER_LIST,
                payload: res.data.result
            })
        }
    }
    ).catch(err=>{
        console.log(err)
    })
}

export const getAllDrivers = () => (dispatch, getstate) => {
    api.get(process.env.REACT_APP_GET_ALL_DRIVERS).then(res=>{
        if(res.statusText === 'OK' && res.data.result?.length){
            dispatch({
                type: SET_DRIVER_LIST,
                payload: res.data.result
            })
        }
    }
    ).catch(err=>{
        console.log(err)
    })
}

export const getDriver = (orderId) => (dispatch, getState) => {
    api.get(process.env.REACT_APP_GET_DRIVER+'/'+orderId).then(res=>{
        if(res.statusText === 'OK' && res.data.result?.length){
            console.log("fine")
            dispatch({
                type: SET_DRIVER,
                payload: res.data.result[0]
            })
        }
    }).catch(err=>{
        console.log(err);
    })
}