import React, { useState } from 'react';
import Wrapper from '../components/misc/PageWrapper'
import {Button, Grid} from '@material-ui/core'

import AddDelivery from './delivery/AddDelivery';
import AddDriver from './driver/AddDriver';
import AddVehicle from './vehicle/AddVehicle';

import Orders from './delivery/Orders';
import Drivers from './driver/Drivers';
import Vehicles from './vehicle/Vehicles';

import Dashboard from './dashboard/dashboard';
import SelectionDialog from './misc/Dialog';

const Home = () => {
    const [selectionDialogOpen, setSelectionDialogOpen] = useState(false)
    const [listKey, setListKey] = useState(null)
    const [parentId, setParentId] = useState(null)

    const handleClose = () => {
        setSelectionDialogOpen(false)
        setParentId(null)
    }

    return (<Wrapper>
        {detailsSectionShow=>(
            <Grid container>
                <SelectionDialog open={selectionDialogOpen} listKey={listKey} handleClose={handleClose} parentId={parentId}/>
                {/* This is details section */}
                <Grid item container xs={12}>
                    {formSwitch(detailsSectionShow, setSelectionDialogOpen, setListKey, setParentId)}
                </Grid>
            </Grid>)
        }
    </Wrapper>)
}

const formSwitch = (detailsSectionShow, setSelectionDialogOpen, setListKey, setParentId)=>{
    switch(detailsSectionShow){
        case "DeliveryForm":
            return <AddDelivery setSelectionDialogOpen={setSelectionDialogOpen} setListKey={setListKey} setParentId={setParentId}/>
        case "DriverForm":
            return <AddDriver/>
        case "VehicleForm":
            return <AddVehicle/>
        case "Drivers":
            return <Drivers setSelectionDialogOpen={setSelectionDialogOpen} setListKey={setListKey} setParentId={setParentId}/>
        case "Vehicles":
            return <Vehicles setSelectionDialogOpen={setSelectionDialogOpen} setListKey={setListKey} setParentId={setParentId}/>
        case "Orders":
            return <Orders setSelectionDialogOpen={setSelectionDialogOpen} setListKey={setListKey} setParentId={setParentId}/>
        default:
            return <Dashboard/>
    }
}

export default Home