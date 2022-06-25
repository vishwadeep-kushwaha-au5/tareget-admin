import React, { useEffect, useState } from 'react';
import {Grid, TextField, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';

import { updateVehcileField, submitVehicle } from '../../redux/actions/vehicle';
import Search from '../googleMaps/GoogleAutocomplete'
import UploadImage from '../misc/cloudinaryImageUpload/imageUpload';

import VehicleModels from '../../public/vehicleModel';
import CheckSpinner from '../misc/checkSpinner';

const useStyles = makeStyles(()=>({
    formWrapper:{
        padding: '20px'
    }
}))


const AddDriver = ()=>{
    const classes= useStyles()
    const dispatch = useDispatch()

    const [showError, setShowError]= useState(false)

    const vehicle = useSelector(state=> state.vehicle.vehicleForm)
    const submitVehicleFlag = useSelector(state=> state.vehicle.submitVehicleFlag)

    const handleInputChange = (input) =>{
        dispatch(updateVehcileField(input.target.name,{...vehicle[input.target.name],value:input.target.value}))
    }

    const handleVehicleModelChange = (x, value)=>{
        // console.log(value)
        handleInputChange({target: {name: 'vehicleModelId', value: value.id}})
    }
    
    const onSubmit = () => {
        setShowError(true)
        let data = (({ownerName, ownerPhoneNumber, ownerAddress, vehicleRegisterationNumber, addressProofType, addressProofPhoto, vehicleModelId})=>({ownerName, ownerPhoneNumber, ownerAddress, vehicleRegisterationNumber, addressProofType, addressProofPhoto, vehicleModelId}))(vehicle)
        dispatch(submitVehicle(data))
    }

    return(
        <Grid container className={classes.formWrapper} spacing={2} justifyContent="center">
            {console.log(submitVehicleFlag)}
            <Typography variant="h5">Add Vehicle:</Typography>
            {!submitVehicleFlag?<><Grid item xs={12}>
                <TextField label="Owner Name" variant="outlined" size="small" onChange={handleInputChange} name="ownerName" value={vehicle.ownerName.value} error={showError && vehicle.ownerName.validation} helperText={<>{vehicle.ownerName.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Owner Phone number" variant="outlined" size="small" onChange={handleInputChange} name="ownerPhoneNumber" value={vehicle.ownerPhoneNumber.value}  error={showError && vehicle.ownerPhoneNumber.validation} helperText={<>{vehicle.ownerPhoneNumber.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Owner Address" variant="outlined" size="small" onChange={handleInputChange} name="ownerAddress" value={vehicle.ownerAddress.value}  error={showError && vehicle.ownerAddress.validation} helperText={<>{vehicle.ownerAddress.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Vehicle Registeration Number" variant="outlined" size="small" onChange={handleInputChange} name="vehicleRegisterationNumber" value={vehicle.vehicleRegisterationNumber.value}  error={showError && vehicle.vehicleRegisterationNumber.validation} helperText={<>{vehicle.vehicleRegisterationNumber.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    id="Vehicle Model"
                    options={Object.values(VehicleModels)}
                    getOptionLabel={(option) => option["modelName"]}
                    style={{ width: 300 }}
                    onChange={handleVehicleModelChange}
                    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                    />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Vehicle Model ID" variant="outlined" size="small" disabled onChange={handleInputChange} name="vehicleModelId" value={vehicle.vehicleModelId.value}  error={showError && vehicle.vehicleModelId.validation} helperText={<>{vehicle.vehicleModelId.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label="Address Proof Type" variant="outlined" size="small" onChange={handleInputChange} name="addressProofType" value={vehicle.addressProofType.value}  error={showError && vehicle.addressProofType.validation} helperText={<>{vehicle.addressProofType.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <UploadImage label="Address Proof Photo" onChange={handleInputChange} name="addressProofPhoto" value={vehicle.addressProofPhoto.value}  error={showError && vehicle.addressProofPhoto.validation} helperText={<>{vehicle.addressProofPhoto.validation}</>}/>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" onClick={onSubmit}>Submit</Button>
            </Grid></>:
            <CheckSpinner success={submitVehicleFlag}/>}
        </Grid>
    )
}

export default AddDriver