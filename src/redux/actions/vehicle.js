import axios from 'axios'
import { validateFields } from '../../utils/validator'
import { getKeyValueObjectFromReduxObject } from '../../utils/helper'

window.validateFields = validateFields
export const UPDATE_VEHICLE_FIELD = "UPDATE_VEHICLE_FIELD"
export const UPDATE_VEHICLE_ERROR = "UPDATE_VEHICLE_ERROR"
export const SET_VEHICLE_LIST = "SET_VEHICLE_LIST"
export const SET_VEHICLE = "SET_VEHICLE"
export const SET_SUBMIT_VEHICLE_FLAG = "SET_SUBMIT_VEHICLE_FLAG"


export const updateVehcileField = (inputName, input) => (dispatch, getState) => {
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
            type: UPDATE_VEHICLE_FIELD,
            payload: input,
            inputName: inputName
        })
    }else{
        dispatch({
            type: UPDATE_VEHICLE_ERROR,
            payload: input,
            inputName: inputName
        })
    }

    // return ({
    //     type: IS_LOADING,
    // })
}

export const submitVehicle = (data) => (dispatch, getState) =>{
    dispatch({type: SET_SUBMIT_VEHICLE_FLAG, payload: 'submitting'})
    console.log(data);
    if(Object.values(data).every(curr => curr.validation === false )){
        axios.post(process.env.REACT_APP_NEW_VEHICLE,getKeyValueObjectFromReduxObject(data)).then(res=>{
            dispatch({type: SET_SUBMIT_VEHICLE_FLAG, payload: 'Done'})
            console.log("Done")
        }).catch(err=>{
            dispatch({type: SET_SUBMIT_VEHICLE_FLAG, payload: false})
            console.log("err", err)
        })
    }else{
        dispatch({type: SET_SUBMIT_VEHICLE_FLAG, payload: false})
        console.log("NONONO")
    }
}

export const updateVehicle = (data) => (dispatch, getState) => {
    if(data // 👈 null and undefined check
    && Object.keys(data).length !== 0
    && Object.getPrototypeOf(data) === Object.prototype){
        axios.put(process.env.REACT_APP_UPDATE_VEHICLE, data).then(res=>{
            console.log("Done")
        }).catch(err=>{
            console.log("err", err)
        })
    }else{
        console.log("NONONO")
    }
}

export const getAvailableVehicles = () => (dispatch, getstate) => {
    axios.get(process.env.REACT_APP_GET_AVAILABLE_VEHICLES).then(res=>{
        if(res.statusText === 'OK' && res.data.result?.length){
            dispatch({
                type: SET_VEHICLE_LIST,
                payload: res.data.result
            })
        }
    }
    ).catch(err=>{
        console.log(err)
    })
}

export const getAllVehicle = () => (dispatch, getstate) => {
    axios.get(process.env.REACT_APP_GET_ALL_VEHICLES).then(res=>{
        if(res.statusText === 'OK' && res.data.result?.length){
            dispatch({
                type: SET_VEHICLE_LIST,
                payload: res.data.result
            })
        }
    }
    ).catch(err=>{
        console.log(err)
    })
}

export const getVehicle = (vehicleId) => (dispatch, getState) => {
    axios.get(process.env.REACT_APP_GET_VEHICLE+'/'+vehicleId).then(res=>{
        console.log(res)
    }).then(err=>{
        console.log(err)
    })
}