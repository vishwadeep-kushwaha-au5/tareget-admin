import React, { useEffect, useState } from 'react';
import {Grid, TextField, Typography, Button, FormControl, FormControlLabel, Checkbox, FormHelperText, Divider} from '@material-ui/core'
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
            dispatch(updateOrderField("baseCharge", {...deliveryOrderState["baseCharge"], value :baseChargeCalculate(input.target?.value?.distance.text, chargeMultiplier)}))
            dispatch(updateOrderField("promoDiscount", {...deliveryOrderState["promoDiscount"], value :0 }))
        }
    }
    
    const handlePromoChange = () =>{
        let baseCharge = deliveryOrderState?.baseCharge?.value
        let newPromoDiscount = deliveryOrderState?.promoDiscount
        if(deliveryOrderState?.promoDiscount.value)
            dispatch(updateOrderField("promoDiscount", {...deliveryOrderState["promoDiscount"], value :0 }))
        else if(baseCharge){
            //apply 50% discount
            let discount = baseCharge/2<500?baseCharge:500
            newPromoDiscount.value = discount
            dispatch(updateOrderField("promoDiscount", {...deliveryOrderState["promoDiscount"], value :discount }))
        }
    }

    useEffect(()=>{
        if(deliveryOrderState.baseCharge.value){
            let mileage = 22;
            if(vehicleModel // 👈 null and undefined check
            && Object.keys(vehicleModel).length !== 0
            && Object.getPrototypeOf(vehicleModel) === Object.prototype) mileage = vehicleModel.mileage
            let chargeMultiplier = mileage/22
            dispatch(updateOrderField("baseCharge", {...deliveryOrderState["baseCharge"], value :deliveryOrderState["baseCharge"]?.value/chargeMultiplier }))
        }
    },[vehicleModel])

    const onSubmit = () => {
        //Todo: Fix 
        setShowError(true)
        let newdeliveryOrderState = (({customerName, originAddress, destinationAddress, customerPhoneNumber, destinationPhoneNumber, distance, timerW, deliveryPartnerId, orderStatus})=> ({customerName, originAddress, destinationAddress, customerPhoneNumber, destinationPhoneNumber, distance, timerW, deliveryPartnerId, orderStatus}))(deliveryOrderState);
        let newBillingState = (({promoDiscount, extraDiscount,baseCharge})=> ({promoDiscount, extraDiscount,baseCharge}))(deliveryOrderState);
        let newReferenceState = (({referencePhoneNumber})=> ({referencePhoneNumber}))(deliveryOrderState);
        dispatch(submitOrder({order: newdeliveryOrderState, billing: newBillingState, reference: newReferenceState}))
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
                        <TextField fullWidth label="Customer Phone number" variant="outlined" size="small" onChange={handleInputChange} name="customerPhoneNumber" value={deliveryOrderState.customerPhoneNumber.value}  error={showError && deliveryOrderState.customerPhoneNumber.validation} helperText={showError && <>{deliveryOrderState.customerPhoneNumber.validation}</>}/>
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
                <TextField label="Name" variant="outlined" size="small" onChange={handleInputChange} name="customerName" value={deliveryOrderState.customerName.value} error={showError && deliveryOrderState.customerName.validation} helperText={showError && <>{deliveryOrderState.customerName.validation}</>}/>
            </Grid>
            <Grid item container xs={12} justifyContent="space-between">
                <Grid item xs={5}>
                    {mapLoaded ?<Search handleInputChange={handlePlaceChange} address={value.originAddress} name="originAddress"  error={showError && deliveryOrderState.originAddress.validation} helperText={showError && <>{deliveryOrderState.originAddress.validation}</>}/> : <div>Loading</div>}
                </Grid>
                <Grid item xs={5}>
                    {mapLoaded ?<Search handleInputChange={handlePlaceChange} address={value.destinationAddress} name="destinationAddress"  error={showError && deliveryOrderState.destinationAddress.validation} helperText={showError && <>{deliveryOrderState.destinationAddress.validation}</>}/> : <div>Loading</div>}                
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Customer Phone number" fullWidth variant="outlined" size="small" onChange={handleInputChange} name="customerPhoneNumber" value={deliveryOrderState.customerPhoneNumber.value}  error={showError && deliveryOrderState.customerPhoneNumber.validation} helperText={showError && <>{deliveryOrderState.customerPhoneNumber.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Destination Phone number" fullWidth variant="outlined" size="small" onChange={handleInputChange} name="destinationPhoneNumber" value={deliveryOrderState.destinationPhoneNumber.value}  error={showError && deliveryOrderState.destinationPhoneNumber.validation} helperText={showError && <>{deliveryOrderState.destinationPhoneNumber.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Timer W" type='number' fullWidth variant="outlined" size="small" onChange={handleInputChange} name="timerW" value={deliveryOrderState.timerW.value.toString()}  error={showError && deliveryOrderState.timerW.validation} helperText={showError && <>{deliveryOrderState.timerW.validation}</>}/>
            </Grid>
            <Grid container item xs={12}>
                <Grid item>
                    <Button variant="contained" onClick={()=> {props.setSelectionDialogOpen(true); setListKey("default");}}>Add driver</Button>
                </Grid>
                <Grid item>
                    Selected Driver: <b>{selectedVehicle?.driverName}</b>
                </Grid>
            </Grid>
            
            {/* BILLING FIELDS BELOW */}
            <Grid item xs={12}>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Billing Details</Typography>
            </Grid>
            
            <Grid container item xs={12} md={6} spacing={2}>
                <Grid item xs={12}>
                    <FormControl>
                        <FormControlLabel
                            control={<Checkbox checked={deliveryOrderState.promoDiscount.value} onChange={handlePromoChange} name="Promo Discount" />}
                            label="Promo Discount"
                        />
                        {showError && <FormHelperText>{deliveryOrderState.promoDiscount.validation}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Extra Discount" type='number' variant="outlined" size="small" onChange={handleInputChange} name="extraDiscount" value={deliveryOrderState.extraDiscount.value.toString()}  error={showError && deliveryOrderState.extraDiscount.validation} helperText={showError && <>{deliveryOrderState.extraDiscount.validation}</>}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Reference Phone Number" variant="outlined" size="small" onChange={handleInputChange} name="referencePhoneNumber" value={deliveryOrderState.referencePhoneNumber.value.toString()}  error={showError && deliveryOrderState.referencePhoneNumber.validation} helperText={showError && <>{deliveryOrderState.referencePhoneNumber.validation}</>}/>
                </Grid> 
            </Grid>
            <Grid container item xs={12} md={6}>
                <Grid container item xs={12}>
                    <Grid item>Promo Discount:</Grid>
                    <Grid item>{deliveryOrderState.promoDiscount.value || 0}</Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid item>Extra Discount:</Grid>
                    <Grid item>{deliveryOrderState.extraDiscount.value || 0}</Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid item>Net Charge:</Grid>
                    <Grid item>{deliveryOrderState.baseCharge.value-(deliveryOrderState.extraDiscount.value || 0)-(deliveryOrderState.promoDiscount.value || 0)}</Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" onClick={onSubmit}>Submit</Button>
            </Grid></>:
            <CheckSpinner success={submitOrderFlag}/>)}
            <Grid item xs={12}>
                Distance: {deliveryOrderState?.distance?.value?.distance?.text}
                Base Charge: {deliveryOrderState?.baseCharge?.value}
            </Grid>
            {formStep === 2 ?<GooglePlannerMap markers={value} mapValue={mapLoaded} selectedMarker={selectedMarker} dimensions={{ width: "100%", height: "500px" }} updateDistanceDetails={handleInputChange}></GooglePlannerMap>:<></>}
        </Grid>
    )
}

export default AddDelivery