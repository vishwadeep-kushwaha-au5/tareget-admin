import { UPDATE_DRIVER_FIELD, UPDATE_DRIVER_ERROR, SET_DRIVER_LIST, SET_DRIVER, SET_SUBMIT_DRIVER_FLAG } from '../actions/driver'

const INITIAL_STATE = {
    driverForm:{
        driverName: {
            value: '', 
            validationType: "validateText",
            validation: true,
            required: true
        },
        driverAddress: {
            value: '', 
            validationType: "validateAddress",
            validation: true,
            required: true
        },
        driverPhoneNumber: {
            value: '', 
            validationType: "validatePhoneNumber",
            validation: true,
            required: true
        },
        licenseNumber: {
            value: '', 
            validationType: "validateLicenseNumber",
            validation: true,
            required: true
        },
        licensePhoto: {
            value: '', 
            validationType: "validateUrl",
            validation: true,
            required: true
        },
        driverPhoto: {
            value: '', 
            validationType: "validateUrl",
            validation: true,
            required: true
        },
        //FYI: fields below are updated later and the fields above are created during new order creation
        currentOrderId: {
            value: null, 
            validationType: "validateText",
            validation: true,
            required: false
        },
        currentVehicleId: {
            value: null, 
            validationType: "validateText",
            validation: true,
            required: false
        }
    },
    driver:{},
    driverList: [],
    submitDriverFlag: false
}

export default function status(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_DRIVER_FIELD:
            return {
                ...state,
                driverForm: { ...state.driverForm,
                    [action.inputName]: action.payload
                }
            }
        case UPDATE_DRIVER_ERROR:
            return {
                ...state,
                driverForm: { ...state.driverForm, 
                    [action.inputName]: action.payload
                }
            }
        case SET_DRIVER_LIST:
            return {
                ...state,
                driverList: action.payload
            }
        case SET_DRIVER:
            return {
                ...state,
                driver: action.payload
            }
        case SET_SUBMIT_DRIVER_FLAG:
            return{
                ...state,
                submitDriverFlag: action.payload
            }
        default:
            return state
    }
}