import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {Grid, TextField} from '@material-ui/core'
import DataGrid from 'react-data-grid';

import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../redux/store';
import { getAllVehicle } from '../../redux/actions/vehicle';
import { VehicleRow } from '../../models/interfaces';
import { restructureDriverForDataGrid } from '../../utils/helper'

const columns = [
    { key: 'id', name: 'ID', width: 120, resizable: true, sortable: true, frozen: true },
    { key: 'ownerName', name: 'Owner Name', width: 120, resizable: true, frozen: true },
    { key: 'ownerAddress', name: 'Owner Address', width: 120, resizable: true },
    { key: 'ownerPhoneNumber', name: 'Phone number', width: 120, resizable: true },
    { key: 'vehicleRegisterationNumber', name: 'Vehicle Registration Number', width: 120, resizable: true },
    { key: 'addressProofType', name: 'Address Proof Type', width: 120, resizable: true },
    { key: 'addressProofPhoto', name: 'Address Proof', width: 120, resizable: true },
    { key: 'vehicleModelId', name: 'Vehicle Model Id', width: 120, resizable: true },
    { key: 'currentDriverId', name: 'Current Driver', width: 120, resizable: true }
  ];
  
function rowKeyGetter(row: VehicleRow) {
    return row?.id?.toString();
  }

const Vehicles = () => {
  const [rows, setRows] =useState<any>([])
  const dispatch = useDispatch()
  const vehicles = useSelector((state: IRootState)=> state.vehicle.vehicleList)

  useEffect(()=>{
    dispatch(getAllVehicle())
  },[])

  useEffect(()=>{
    let reVehicle = vehicles.map((vehicle : VehicleRow) =>restructureDriverForDataGrid(vehicle))
    setRows(reVehicle)
  },[vehicles])

  return (<DataGrid
      columns={columns}
      rows={rows}
      rowKeyGetter={rowKeyGetter}
      rowHeight={30}
      className="fill-grid"
  />);
}

export default Vehicles