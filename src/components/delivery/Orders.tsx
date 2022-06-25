import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {Grid, TextField, Button} from '@material-ui/core'
import DataGrid from 'react-data-grid';

import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../redux/store';
import { getAllOrders } from '../../redux/actions/deliveryOrder';
import { OrderRow } from '../../models/interfaces';
import { restructureOrderForDataGrid } from '../../utils/helper'
import moment from 'moment';

const columns = (openSelectionDialog: any, setListKey :any, setParentId :any) => [
    { key: 'id', name: 'ID', width: 120, resizable: true, sortable: true, frozen: true },
    { key: 'customerName', name: 'Customer Name', width: 120, resizable: true, frozen: true },
    { key: 'originAddress', name: 'From', width: 120, resizable: true },
    { key: 'destinationAddress', name: 'To', width: 120, resizable: true },
    { key: 'customerPhoneNumber', name: 'Phone number', width: 120, resizable: true },
    { key: 'destionationPhoneNumber', name: 'Destionation Contact', width: 120, resizable: true },
    { key: 'distance', name: 'Distance', width: 120, resizable: true },
    { key: 'billingDetails', name: 'Base Charge', width: 120, resizable: true },
    { key: 'timerW', name: 'Timer W.', width: 120, resizable: true },
    { key: 'orderStatus', name: 'Order Status', width: 120, resizable: true },
    { key: 'deliveryPartnerId', name: 'Delivery Partner', width: 120, resizable: true,
      formatter(props: any) {
        return <>{props?.row?.deliveryPartnerId? props.row.deliveryPartnerId : <Button onClick={()=> {openSelectionDialog(true); setListKey("driver"); setParentId(props.row.id)}}>Add</Button>}</>
      }
    },
    { key: 'deliveryStartTime', name: 'Start Time', width: 120, resizable: true,
      formatter(props: any){
        return <>{moment(props.row.deliveryStartTime).format('Do MMM')}</>
      }
    },
    { key: 'loadEndTime', name: 'Loading End Time', width: 120, resizable: true ,
    formatter(props: any){
      return <>{moment(props.row.loadEndTime).format('Do MMM')}</>
    }},
    { key: 'unloadStartTime', name: 'Unloading Start Time', width: 120, resizable: true ,
    formatter(props: any){
      return <>{moment(props.row.unloadStartTime).format('Do MMM')}</>
    }},
    { key: 'deliveryEndTime', name: 'Delivery Start Time', width: 120, resizable: true,
    formatter(props: any){
      return <>{moment(props.row.deliveryEndTime).format('Do MMM')}</>
    } }
  ];
  
function rowKeyGetter(row: OrderRow) {
    return row?.id?.toString();
  }

const Orders = (props: any) => {
  const {setSelectionDialogOpen,  setListKey, setParentId, ...other} = props
  const [rows, setRows] =useState<any>([])
  const dispatch = useDispatch()
  const orders = useSelector((state: IRootState)=> state.deliveryOrder.orderList)

  useEffect(()=>{
    dispatch(getAllOrders())
  },[])

  useEffect(()=>{
    let reOrders = orders.map((order : OrderRow) =>restructureOrderForDataGrid(order))
    setRows(reOrders)
  },[orders])

  return (<DataGrid
      columns={columns(setSelectionDialogOpen, setListKey, setParentId)}
      rows={rows}
      rowKeyGetter={rowKeyGetter}
      rowHeight={30}
      className="fill-grid"
  />);
}

export default Orders