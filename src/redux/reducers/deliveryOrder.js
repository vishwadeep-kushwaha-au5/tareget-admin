import { UPDATE_ORDER_FIELD, UPDATE_ORDER_ERROR, SET_ORDER_LIST, SET_ORDER, SET_VEHICLE_MODEL_ID, SET_SUBMIT_ORDER_FLAG, SET_SELECTED_VEHICLE, UPDATE_NUMBER_OF_ORDER_BY_USER } from '../actions/deliveryOrder'

const INITIAL_STATE = {
    orderForm: {
        customerName: {
            value: '', 
            validationType: "validateText",
            validation: true,
            required: true
        },
        originAddress: {
            value: '', 
            validationType: "validateObject",
            validation: true,
            required: true
        },
        destinationAddress: {
            value: '', 
            validationType: "validateObject",
            validation: true,
            required: true
        },
        customerPhoneNumber: {
            value: '', 
            validationType: "validatePhoneNumber",
            validation: true,
            required: true
        },
        destinationPhoneNumber: {
            value: '', 
            validationType: "validatePhoneNumber",
            validation: true,
            required: true
        },
        distance: {
            value: '', 
            validationType: "validateObject",
            validation: true,
            required: true
        },
        baseCharge: {
            value: 0, 
            validationType: "validateNumber",
            validation: true,
            required: true
        },
        extraDiscount: {
            value: 0,
            validationType: "validateNumber",
            validation: false,
            required: false
        },    
        promoDiscount: {
            value: 0,
            validationType: "validateNumber",
            validation: false,
            required: false
        },    
        tollTax: {
            value: 0,
            validationType: "validateNumber",
            validation: false,
            required: false
        },    
        roadTax: {
            value: 0,
            validationType: "validateNumber",
            validation: false,
            required: false
        },    
        additional: {
            value: 0,
            validationType: "validateNumber",
            validation: false,
            required: false
        },
        referencePhoneNumber: {
            value: '',
            validationType: "validatePhoneNumber",
            validation: false,
            required: false
        },
        timerW: {
            value: '',
            validationType: "validateNumber",
            validation: true,
            required: true
        },
        deliveryPartnerId: {
            value: '',
            validationType: "validateText", //objectId of driver model
            validation: true,
            required: true
        },
        //FYI: fields below are updated later and the fields above are created during new order creation
        orderStatus: {
            value: "1", //P.S.: {0=> order cancelled, 1=> order placed, 2=> order reached pickup point, 3=> order left pickup point, 4=> order reached destination, 5=> order left destination, deivery complete}
            validationType: "validateText",
            validation: false,
            required: true
        },
        referenceCommission: {
            value: 0, 
            validationType: "validateNumber",
            validation: false,
            required: false
        },
        deliveryStartTime: {
            value: null, 
            validationType: "validateDateTime",
            validation: false,
            required: false
        },
        loadEndTime: {
            value: null, 
            validationType: "validateDateTime",
            validation: false,
            required: false
        },
        unloadStartTime: {
            value: null, 
            validationType: "validateDateTime",
            validation: false,
            required: false
        },
        deliveryEndTime: {
            value: null, 
            validationType: "validateDateTime",
            validation: false,
            required: false
        }
    },
    order: {},
    orderList:[],
    vehicleModel: {},
    selectedVehicle: {},
    submitOrderFlag: false,
    numberOfOrder: 0
}

export default function status(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_ORDER_FIELD:
            return {
                ...state,
                orderForm: { ...state.orderForm,
                    [action.inputName]: action.payload
                }
            }
        case UPDATE_ORDER_ERROR:
            return {
                ...state,
                orderForm: { ...state.orderForm, 
                    [action.inputName]: action.payload
                }
            }
        case SET_ORDER_LIST:
            return {
                ...state,
                orderList: action.payload
            }
        case SET_ORDER:
            return {
                ...state,
                order: action.payload
            }
        case SET_VEHICLE_MODEL_ID:
            return{
                ...state,
                vehicleModel: action.payload
            }
        case SET_SELECTED_VEHICLE:
            return{
                ...state,
                selectedVehicle: action.payload
            }
        case SET_SUBMIT_ORDER_FLAG:
            return{
                ...state,
                submitOrderFlag: action.payload
            }
        case UPDATE_NUMBER_OF_ORDER_BY_USER: 
            return{
                ...state,
                numberOfOrder: action.payload
            }
        default:
            return state
    }
}