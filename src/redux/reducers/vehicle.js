import { UPDATE_VEHICLE_FIELD, UPDATE_VEHICLE_ERROR, SET_VEHICLE_LIST, SET_VEHICLE, SET_SUBMIT_VEHICLE_FLAG } from '../actions/vehicle'

const INITIAL_STATE = {
    vehicleForm: {  
        ownerName: {
            value: '', 
            validationType: "validateText",
            validation: true,
            required: true
        },
        ownerPhoneNumber: {
            value: '', 
            validationType: "validatePhoneNumber",
            validation: true,
            required: true
        },
        ownerAddress: {
            value: '', 
            validationType: "validateAddress",
            validation: true,
            required: true
        },
        vehicleRegisterationNumber: {
            value: '', 
            validationType: "validateVehicleRegisterationNumber",
            validation: true,
            required: true
        },
        addressProofType: {
            value: '', 
            validationType: "validateText",
            validation: true,
            required: true
        },
        addressProofPhoto: {
            value: '', 
            validationType: "validateUrl",
            validation: true,
            required: true
        },
        vehicleModelId: {
            value: '', 
            validationType: "validateText", //objectId of vehicle model
            validation: true,
            required: true
        },
        //FYI: fields below are updated later and the fields above are created during new VEHICLE creation
        currentDriverId: {
            value: null, 
            validationType: "validateText", //objectId of vehicle model
            validation: true,
            required: false
        },
    },
    vehicle: {},
    vehicleList: [],
    submitVehicleFlag: false
}

export default function status(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_VEHICLE_FIELD:
            return {
                ...state,
                vehicleForm: {
                    ...state.vehicleForm,
                    [action.inputName]: action.payload
                }
            }
        case UPDATE_VEHICLE_ERROR:
            return {
                ...state,
                vehicleForm: {
                    ...state.vehicleForm,
                    [action.inputName]: action.payload
                }
            }
        case SET_VEHICLE_LIST:
            return {
                ...state,
                vehicleList: action.payload
            }
        case SET_VEHICLE:
            return {
                ...state,
                vehicle: action.payload
            }
        case SET_SUBMIT_VEHICLE_FLAG:
            return{
                ...state,
                submitVehicleFlag: action.payload
            }
        default:
            return state
    }
}