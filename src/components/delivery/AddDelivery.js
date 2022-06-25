import React, { useEffect, useState } from 'react';
import {Grid, TextField, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';


import { baseChargeCalculate } from '../../utils/helper';
import { updateOrderField, submitOrder, fetchUserDetailsByPhone } from '../../redux/actions/deliveryOrder';
import { setMapLoaded, unsetMapLoaded } from '../../redux/actions/googleMap';
import Search from '../googleMaps/GoogleAutocomplete'
import GooglePlannerMap from '../googleMaps/map'

import CheckSpinner from '../misc/checkSpinner';

const useStyles = makeStyles(()=>({
    formWrapper:{
        padding: '20px'
    }
}))

const AddDelivery = (props)=>{
    const classes= useStyles()
    const dispatch = useDispatch()

    const [showError, setShowError]= useState(false)
    const [formStep, setFormStep] = useState(1)
    
    const selectedVehicle = useSelector(state=>state.deliveryOrder.selectedVehicle)
    const mapLoaded = useSelector(state => state.googleMap.mapLoaded)
    const deliveryOrderState = useSelector(state=> state.deliveryOrder.orderForm)
    const submitOrderFlag = useSelector(state=> state.deliveryOrder.submitOrderFlag)
    const drivers = useSelector((state)=> state.driver.driverList)
    const vehicleModel = useSelector((state)=> state.deliveryOrder.vehicleModel)
    const numberOfOrder = useSelector((state)=> state.deliveryOrder.numberOfOrder)

    const [selectedMarker, setSelectedMarker] = useState({})
    const [value, setValue] = useState({
        originAddress: {},
        destinationAddress: {}
    })
    
    const {setSelectionDialogOpen, setListKey, ...others} = props

    function handlePlaceChange(input) {
        setValue(value=>({
            ...value,
            [input.target.name]: input.target.value
        }))
        setSelectedMarker(input.target.value)
        handleInputChange(input)
        // if (inputType === "markers") { dispatch(updateSelectedMarker(data.length ? data[data.length - 1] : '')) }
        // dispatch(updateInput(data, inputType, day))
        // dispatch(updateStepCreateTrip({ category: category, type: type, departureDate: departureDate }, change))
    }

    const handleInputChange = (input) =>{
        let value = input.target.type==="number"?parseInt(input.target.value):input.target.value //doing this because material ui input return values in string format. This needs to be improved by making a seperate component for textfield input and handling parseInt in that component
        dispatch(updateOrderField(input.target.name,{...deliveryOrderState[input.target.name], value: value}))
        if(input.target.name === 'distance'){
            let mileage = 22;
            if(vehicleModel // 👈 null and undefined check
            && Object.keys(vehicleModel).length !== 0
            && Object.getPrototypeOf(vehicleModel) === Object.prototype) mileage = vehicleModel.mileage
            let chargeMultiplier = mileage/22
            dispatch(updateOrderField("billingDetails", {...deliveryOrderState[input.target.name], value :{baseCharge: baseChargeCalculate(input.target?.value?.distance.text, chargeMultiplier)} }))
        }
    }

    useEffect(()=>{
        if(deliveryOrderState.billingDetails.value){
            console.log('hehe')
            let mileage = 22;
            if(vehicleModel // 👈 null and undefined check
            && Object.keys(vehicleModel).length !== 0
            && Object.getPrototypeOf(vehicleModel) === Object.prototype) mileage = vehicleModel.mileage
            let chargeMultiplier = mileage/22
            dispatch(updateOrderField("billingDetails", {...deliveryOrderState["billingDetails"], value :{baseCharge: deliveryOrderState["billingDetails"]?.value?.baseCharge/chargeMultiplier} }))
        }
    },[vehicleModel])

    const onSubmit = () => {
        //Todo: Fix 
        setShowError(true)
        let newdeliveryOrderState = (({customerName, originAddress, destinationAddress, customerPhoneNumber, destionationPhoneNumber, distance, billingDetails, timerW, deliveryPartnerId, orderStatus})=> ({customerName, originAddress, destinationAddress, customerPhoneNumber, destionationPhoneNumber, distance, billingDetails, timerW, deliveryPartnerId, orderStatus}))(deliveryOrderState);
        dispatch(submitOrder(newdeliveryOrderState))
    }

    
    
    //Form step 1 functions below
    
    const handleFormStepOneInputChange = (input) => {
        handleFormStepOneInputChange(input)
    }
    
    const handleFormStepOneSubmit = () =>{
        if(deliveryOrderState.customerPhoneNumber.value && !deliveryOrderState.customerPhoneNumber.validation){
            setFormStep(2)
            dispatch(fetchUserDetailsByPhone(deliveryOrderState.customerPhoneNumber.value))
        }
    }

    useEffect(()=>{dispatch(unsetMapLoaded())},[])
    
    return(
        <Grid container className={classes.formWrapper} spacing={2} justifyContent="center">
            <Typography variant="h5">Add Derlivery:</Typography>{
                formStep === 1 ?    
                <Grid item container xs={12}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Customer Phone number" variant="outlined" size="small" onChange={handleInputChange} name="customerPhoneNumber" value={deliveryOrderState.customerPhoneNumber.value}  error={showError && deliveryOrderState.customerPhoneNumber.validation} helperText={<>{deliveryOrderState.customerPhoneNumber.validation}</>}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" onClick={handleFormStepOneSubmit}>Submit</Button>
                    </Grid>
                </Grid>:
            (!submitOrderFlag?<>
            <Grid item xs={12} container direction='row-reverse'>
                <Grid item> 
                    Number Of Order: {numberOfOrder}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Name" variant="outlined" size="small" onChange={handleInputChange} name="customerName" value={deliveryOrderState.customerName.value} error={showError && deliveryOrderState.customerName.validation} helperText={<>{deliveryOrderState.customerName.validation}</>}/>
            </Grid>
            <Grid item container xs={12} justifyContent="space-between">
                <Grid item xs={5}>
                    {mapLoaded ?<Search handleInputChange={handlePlaceChange} address={value.originAddress} name="originAddress"  error={showError && deliveryOrderState.originAddress.validation} helperText={<>{deliveryOrderState.originAddress.validation}</>}/> : <div>Loading</div>}
                </Grid>
                <Grid item xs={5}>
                    {mapLoaded ?<Search handleInputChange={handlePlaceChange} address={value.destinationAddress} name="destinationAddress"  error={showError && deliveryOrderState.destinationAddress.validation} helperText={<>{deliveryOrderState.destinationAddress.validation}</>}/> : <div>Loading</div>}                
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Customer Phone number" variant="outlined" size="small" onChange={handleInputChange} name="customerPhoneNumber" value={deliveryOrderState.customerPhoneNumber.value}  error={showError && deliveryOrderState.customerPhoneNumber.validation} helperText={<>{deliveryOrderState.customerPhoneNumber.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Destination Phone number" variant="outlined" size="small" onChange={handleInputChange} name="destionationPhoneNumber" value={deliveryOrderState.destionationPhoneNumber.value}  error={showError && deliveryOrderState.destionationPhoneNumber.validation} helperText={<>{deliveryOrderState.destionationPhoneNumber.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Timer W" type='number' variant="outlined" size="small" onChange={handleInputChange} name="timerW" value={deliveryOrderState.timerW.value.toString()}  error={showError && deliveryOrderState.timerW.validation} helperText={<>{deliveryOrderState.timerW.validation}</>}/>
            </Grid>
            <Grid container item xs={12}>
                <Grid item>
                    <Button onClick={()=> {props.setSelectionDialogOpen(true); setListKey("default");}}>Add driver</Button>
                </Grid>
                <Grid item>
                    Selected Driver: <b>{selectedVehicle?.driverName}</b>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" onClick={onSubmit}>Submit</Button>
            </Grid></>:
            <CheckSpinner success={submitOrderFlag}/>)}
            <Grid item xs={12}>
                Distance: {deliveryOrderState?.distance?.value?.distance?.text}
                Base Charge: {deliveryOrderState?.billingDetails?.value?.baseCharge}
            </Grid>
            {formStep === 2 ?<GooglePlannerMap markers={value} mapValue={mapLoaded} selectedMarker={selectedMarker} dimensions={{ width: "100%", height: "500px" }} updateDistanceDetails={handleInputChange}></GooglePlannerMap>:<></>}
        </Grid>
    )
}

export default AddDelivery