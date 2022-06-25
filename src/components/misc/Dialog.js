import React, { useEffect, useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { useDispatch, useSelector } from 'react-redux';
import { getAvailableDrivers, updateDriver } from '../../redux/actions/driver';
import { getAvailableVehicles, updateVehicle } from '../../redux/actions/vehicle';
import { updateOrder, updateOrderField, updateVehicleModel, setSelectedVehicle } from '../../redux/actions/deliveryOrder';
import { restructureDriverForCommonDataGrid, restructureVehicleForCommonDataGrid } from '../../utils/helper';

import DataGrid from 'react-data-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = ((props) => {
  const classes = useStyles()
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const driverColumns = (handleSelection) => [
    { key: 'id', name: 'ID', width: 120, resizable: true, sortable: true, frozen: true },
    { key: 'ownerName', name: 'Owner Name', width: 120, resizable: true, frozen: true },
    { key: 'ownerPhoneNumber', name: 'Owner Phoner Number', width: 120, resizable: true, frozen: true },
    { key: 'select', name: 'Select', width: 120, resizable: true, sortable: true, frozen: true, 
        formatter(props){
            return <Button variant="contained" onClick={()=>handleSelection(props.row)}>Select</Button>
        }
    },
    { key: 'name', name: 'Name', width: 120, resizable: true, frozen: true },
    { key: 'vehicleModelId', name: 'Vehicle Model', width: 120, resizable: true },
    { key: 'vehicleNumber', name: 'Vehicle Registration Number', width: 120, resizable: true },
    { key: 'address', name: 'Address', width: 120, resizable: true },
    { key: 'licenseNumber', name: 'License Number', width: 120, resizable: true },
  ];

  
const vehicleColumns = (handleSelection) => [
  { key: 'id', name: 'ID', width: 120, resizable: true, sortable: true, frozen: true },
  { key: 'select', name: 'Select', width: 120, resizable: true, sortable: true, frozen: true, 
      formatter(props){
          return <Button variant="contained" onClick={()=>handleSelection(props.row.id)}>Select</Button>
      }
  },
  { key: 'name', name: 'Name', width: 120, resizable: true, frozen: true },
  { key: 'vehicleModelId', name: 'Vehicle Model', width: 120, resizable: true },
  { key: 'vehicleNumber', name: 'Vehicle Registration Number', width: 120, resizable: true },
  { key: 'address', name: 'Address', width: 120, resizable: true },
  { key: 'licenseNumber', name: 'License Number', width: 120, resizable: true },
];

  
function rowKeyGetter(row) {
    return row?.id?.toString();
  }

export default function SelectionDialog(props) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [rows, setRows] =useState([])
  const availableDrivers = useSelector(state=>state.driver.driverList)
  const availableVehicles = useSelector(state=>state.vehicle.vehicleList)
  const deliveryOrderState = useSelector(state=> state.deliveryOrder.orderForm)

  const handleClose = () => {
    props.handleClose(false);
  };

  useEffect(()=>{
    switch(props.listKey){
        case "driver":
            console.log("HHHHH")
            dispatch(getAvailableDrivers());
            return
        case "vehicle":
            dispatch(getAvailableVehicles())
            return
        case "default":
            dispatch(getAvailableDrivers());
            return
        default:
          return
    }  
  },[props])

  useEffect(()=>{
    switch(props.listKey){
        case "driver":
            setRows(availableDrivers.map(driver =>restructureDriverForCommonDataGrid(driver)))
            return
        case "vehicle":
            setRows(availableVehicles.map(vehicle =>restructureVehicleForCommonDataGrid(vehicle)))
            return
        default:
            setRows(availableDrivers.map(driver =>restructureDriverForCommonDataGrid(driver)))
            return
    }
  },[availableDrivers, availableVehicles])

  const handleSelection = (vehicle) => {
    let id = vehicle.currentDriverId
    let vehicleModelId = vehicle.vehicleModelId
    switch(props.listKey){
        case "driver":
            dispatch(updateOrder({id: props.parentId, deliveryPartnerId: id}))
            dispatch(updateDriver({id: id, currentOrderId: props.parentId}))
            return
        case "vehicle":
            dispatch(updateDriver({id: props.parentId, currentVehicleId: id}))
            dispatch(updateVehicle({id: id, currentDriverId: props.parentId}))
            return
        default:
            dispatch(updateOrderField("deliveryPartnerId",{...deliveryOrderState["deliveryPartnerId"], value: id}))
            dispatch(updateVehicleModel(vehicleModelId))
            dispatch(setSelectedVehicle(vehicle))
            handleClose()
            return
    }  

  }

  return (
    <div>
      <Dialog onClose={handleClose} maxWidth='xl' aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add {props.listKey}
        </DialogTitle>
        <DialogContent dividers>
            <DataGrid
                columns={props.listKey === 'vehicle' ? vehicleColumns(handleSelection) : driverColumns(handleSelection)}
                rows={rows}
                rowKeyGetter={rowKeyGetter}
                rowHeight={30}
                className="fill-grid"
            />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
