import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {Grid, TextField, Button} from '@material-ui/core'
import DataGrid from 'react-data-grid';

import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../redux/store';
import { getAvailableDrivers, getAllDrivers } from '../../redux/actions/driver';
import { DriverRow } from '../../models/interfaces';
import { restructureDriverForDataGrid } from '../../utils/helper'

const columns = (openSelectionDialog: any, setListKey :any, setParentId: any) => [
    { key: 'id', name: 'ID', width: 120, resizable: true, sortable: true, frozen: true },
    { key: 'driverName', name: 'Driver Name', width: 120, resizable: true, frozen: true },
    { key: 'currentOrderId', name: 'Cuurent Order', width: 120, resizable: true },
    { key: 'driverAddress', name: 'Driver Address', width: 120, resizable: true },
    { key: 'driverPhoneNumber', name: 'Phone number', width: 120, resizable: true },
    { key: 'licenseNumber', name: 'License Number', width: 120, resizable: true },
    { key: 'licensePhoto', name: 'License Photo', width: 120, resizable: true },
    { key: 'driverPhoto', name: 'Driver Photo', width: 120, resizable: true },
    { key: 'currentVehicleId', name: 'Cuurent Vehicle', width: 120, resizable: true,
      formatter(props: any) {
        return <>{props?.row?.currentVehicleId? props.row.currentVehicleId : <Button onClick={()=> {openSelectionDialog(true); setListKey("vehicle"); setParentId(props.row.id)}}>Add</Button>}</>
      }
    }
  ];
  
function rowKeyGetter(row: DriverRow) {
    return row?.id?.toString();
  }

const Drivers = (props: any) => {
  const {setSelectionDialogOpen,  setListKey, setParentId, ...other} = props
  const [rows, setRows] =useState<any>([])
  const dispatch = useDispatch()
  const drivers = useSelector((state: IRootState)=> state.driver.driverList)

  useEffect(()=>{
    dispatch(getAllDrivers())
  },[])

  useEffect(()=>{
    let reDrivers = drivers.map((driver : DriverRow) =>restructureDriverForDataGrid(driver))
    setRows(reDrivers)
  },[drivers])

  return (<DataGrid
      columns={columns(setSelectionDialogOpen, setListKey, setParentId)}
      rows={rows}
      rowKeyGetter={rowKeyGetter}
      rowHeight={30}
      className="fill-grid"
  />);
}

export default Drivers