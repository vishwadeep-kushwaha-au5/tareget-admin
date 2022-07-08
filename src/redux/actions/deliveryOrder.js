import api from '../../utils/api';
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

export const submitOrder = (order) => (dispatch, getState) => {
    dispatch({type: SET_SUBMIT_ORDER_FLAG, payload: 'Submitting'})
    let spreadOrder = []
    Object.values(order).forEach(value=>spreadOrder = [...spreadOrder,...(Object.values(value))])

    if(Object.values(spreadOrder).every(curr => curr.validation === false )){
        order.order = getKeyValueObjectFromReduxObject(order.order) 
        order.billing = getKeyValueObjectFromReduxObject(order.billing) 
        order.reference = getKeyValueObjectFromReduxObject(order.reference) 

        api.post(process.env.REACT_APP_NEW_ORDER,order).then(res=>{
            api.put(process.env.REACT_APP_UPDATE_DRIVER, {id: res?.data?.result?.deliveryPartnerId, currentOrderId: res?.data?.result?._id}).then(res=>{
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
    }
}

export const updateOrder = (orderPart, data, orderId) => async (dispatch, getState) => {
    dispatch({type: SET_SUBMIT_ORDER_FLAG, payload: 'Submitting'})

    if(Object.values(data).every(curr => curr.validation === false )){
        console.log(data, orderId)
        data = getKeyValueObjectFromReduxObject(data)
        data = {orderId: orderId, ...data}

        api.put(process.env.REACT_APP_UPDATE_ORDER,{[orderPart]: data}).then(res=>{
            let order = getState().deliveryOrder.order
            console.log(res)
            order = {...order,...res.data.result}
            dispatch({
                type: SET_ORDER,
                payload: order
            })
            return true
        }).catch(err=>{
            dispatch({type: SET_SUBMIT_ORDER_FLAG, payload: false})
            console.log("err", err)
        })
    }else{
        dispatch({type: SET_SUBMIT_ORDER_FLAG, payload: false})
    }
}

export const updateOrderDriver = (data) => (dispatch, getState) => {
    if(data // 👈 null and undefined check
    && Object.keys(data).length !== 0
    && Object.getPrototypeOf(data) === Object.prototype){
        api.put(process.env.REACT_APP_UPDATE_ORDER_DRIVER, data).then(res=>{
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
    api.get(process.env.REACT_APP_GET_ALL_ORDERS+'/'+pageNumber).then(res=>{
        if(res.statusText === 'OK' && res.data.result?.length){
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
    api.get(process.env.REACT_APP_GET_ORDER+'/'+orderId).then(res=>{
        if(res.statusText === 'OK' && res.data.result){
            dispatch({
                type: SET_ORDER,
                payload: res.data.result
            })
        }
    }).catch(err=>{
        console.log(err);
    })
}

export const fetchUserDetailsByPhone = (userPhoneNumber) => (dispatch, getState) =>{
    if(userPhoneNumber){
        api.get(process.env.REACT_APP_GET_USER+'/'+userPhoneNumber).then(res=>{
            if(res.statusText === 'OK'){
                let newOrderForm = getState().deliveryOrder.orderForm
                let user = res.data?.result?.order

                newOrderForm.customerName.value = user.customerName
                newOrderForm.customerName.validation = false
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