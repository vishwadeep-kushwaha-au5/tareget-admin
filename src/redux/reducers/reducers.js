
import { combineReducers } from 'redux';

import auth from "./auth"
import status from './status'
import googleMap from './googleMap'
import deliveryOrder from  './deliveryOrder'
import driver from './driver'
import vehicle from './vehicle'

export default combineReducers({
    auth,
    googleMap,
    status,
    deliveryOrder,
    driver,
    vehicle
});