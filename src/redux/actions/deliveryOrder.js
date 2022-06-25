import axios from 'axios'
import { validateFields } from '../../utils/validator'
import { getKeyValueObjectFromReduxObject } from '../../utils/helper'
import VehicleModels from '../../public/vehicleModel';

window.validateFields = validateFields
export const UPDATE_ORDER_FIELD = "UPDATE_ORDER_FIELD"
export const UPDATE_ORDER_ERROR = "UPDATE_ORDER_ERROR"
export const SET_ORDER_LIST = "SET_ORDER_LIST"
export const SET_ORDER = "SET_ORDER"
export const SET_VEHICLE_MODEL_ID = "SET_VEHICLE_MODEL_ID"
export const SET_SELECTED_VEHICLE = "SET_SELECTED_VEHICLE"
export const SET_SUBMIT_ORDER_FLAG = "SET_SUBMIT_ORDER_FLAG"
export const UPDATE_NUMBER_OF_ORDER_BY_USER = "UPDATE_NUMBER_OF_ORDER_BY_USER"


export const updateOrderField = (inputName, input) => (dispatch, getState) => {
    console.log(inputName, input)
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
    console.log(input["validation"])
    if(!input["validation"]){
        dispatch({
            type: UPDATE_ORDER_FIELD,
            payload: input,
            inputName: inputName
        })
    }else{
        dispatch({
            type: UPDATE_ORDER_ERROR,
            payload: input,
            inputName: inputName
        })
    }

    // return ({
    //     type: IS_LOADING,
    // })
}

export const submitOrder = (data) => (dispatch, getState) => {
    dispatch({type: SET_SUBMIT_ORDER_FLAG, payload: 'Submitting'})
    if(Object.values(data).every(curr => curr.validation === false )){
        axios.post(process.env.REACT_APP_NEW_ORDER,getKeyValueObjectFromReduxObject(data)).then(res=>{
            axios.put(process.env.REACT_APP_UPDATE_DRIVER, {id: res?.data?.result?.deliveryPartnerId, currentOrderId: res?.data?.result?._id}).then(res=>{
                dispatch({type: SET_SUBMIT_ORDER_FLAG, payload: 'Done'})
            }).catch(err=>{
                dispatch({type: SET_SUBMIT_ORDER_FLAG, payload: false})
                console.log("err", err)
            })
        }).catch(err=>{
            dispatch({type: SET_SUBMIT_ORDER_FLAG, payload: false})
            console.log("err", err)
        })
    }else{
        dispatch({type: SET_SUBMIT_ORDER_FLAG, payload: false})
        console.log("Validation false")
    }
}

export const updateOrder = (data) => (dispatch, getState) => {
    if(data // 👈 null and undefined check
    && Object.keys(data).length !== 0
    && Object.getPrototypeOf(data) === Object.prototype){
        axios.put(process.env.REACT_APP_UPDATE_ORDER, data).then(res=>{
            console.log("Done")
        }).catch(err=>{
            console.log("err", err)
        })
    }else{
        console.log("NONONO")
    }
}

export const updateVehicleModel = (vehicleModelId) => (dispatch, getState) =>{
    dispatch({
        type: SET_VEHICLE_MODEL_ID,
        payload: VehicleModels[vehicleModelId] //TODO: replace this with actual vehicle Model ID
    })
}

export const setSelectedVehicle = (vehicle) => (dispatch, getState) =>{
    dispatch({
        type: SET_SELECTED_VEHICLE,
        payload: vehicle //TODO: replace this with actual vehicle Model ID
    })
}

export const getAllOrders = (pageNumber = 0) => (dispatch, getState) => {
    axios.get(process.env.REACT_APP_GET_ALL_ORDERS+'/'+pageNumber).then(res=>{
        if(res.statusText === 'OK' && res.data.result?.length){
            console.log("fine")
            dispatch({
                type: SET_ORDER_LIST,
                payload: res.data.result
            })
        }
    }
    ).catch(err=>{
        console.log(err)
    })
}

export const getOrder = (orderId) => (dispatch, getState) => {
    axios.get(process.env.REACT_APP_GET_ORDER+'/'+orderId).then(res=>{
        if(res.statusText === 'OK' && res.data.result?.length){
            dispatch({
                type: SET_ORDER,
                payload: res.data.result[0]
            })
        }
    }).catch(err=>{
        console.log(err);
    })
}

export const fetchUserDetailsByPhone = (userPhoneNumber) => (dispatch, getState) =>{
    if(userPhoneNumber){
        axios.get(process.env.REACT_APP_GET_USER+'/'+userPhoneNumber).then(res=>{
            if(res.statusText === 'OK'){
                let newOrderForm = getState().deliveryOrder.orderForm
                let user = res.data?.result?.order
                console.log(user)

                newOrderForm.customerName.value = user.customerName
                console.log(res)
                dispatch({
                    type: UPDATE_ORDER_FIELD,
                    inputName: 'customerName',
                    payload: newOrderForm.customerName
                })

                dispatch({
                    type: UPDATE_NUMBER_OF_ORDER_BY_USER,
                    payload: res.data?.result?.numberOfOrders? res.data?.result.numberOfOrders : 0
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }else{
    }
}