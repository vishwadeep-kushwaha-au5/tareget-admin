import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import WhatsAppSendMessage from '../misc/WhatsAppSendMessage';
import Wrapper from '../misc/PageWrapper';
import { makeStyles } from '@material-ui/styles';
import {Grid, Card, Typography, Divider, Avatar, TextField, Button} from '@material-ui/core'

import {orderStatusToText, getBillingTextForWhatsApp} from '../../utils/helper'
import { IRootState } from '../../redux/store';
import {getOrder, updateOrderField, submitOrder, fetchUserDetailsByPhone, updateOrder} from '../../redux/actions/deliveryOrder';
import {AiFillEdit} from 'react-icons/ai'

import moment from 'moment';

interface IParams {
    id: any
}


const useStyles = makeStyles((theme)=>({
    cardWrapper: {
        margin: 5,
        padding: "10px"
    },
    divider: {
        margin: "5px 0 15px 0px"
    },
    textBox: {
        margin: '8px 0px'
    },
    smallButton:{
        marginLeft: '8px'
    }
}))

const ViewOrder = (props: any) =>{
    const [toggleNumber, setToggleNumber] = useState(0);
    const params: IParams = useParams()
    const order = useSelector((state: IRootState)=>state.deliveryOrder.order)
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(()=>{
        if(params?.id){
            dispatch(getOrder(params.id))
        }
    }
    ,[params?.id])

    const toggleEdit = (newToggleNumber: number) => {
        if(newToggleNumber === toggleNumber)
            setToggleNumber(0)
        else
            setToggleNumber(newToggleNumber)
    }

    return <Wrapper>
        {(props:any)=>(<Grid container>
            <Grid container item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h2">Order</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card className={classes.cardWrapper}>
                        <Grid container>
                            <Grid container item xs={12} justifyContent="space-between">
                                <Grid item><Typography variant="h4" color="primary">Order details</Typography></Grid>
                                <Grid item>
                                    <Avatar onClick={()=>toggleEdit(1)}><AiFillEdit/></Avatar>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                            {toggleNumber===1?
                            <Grid item xs={12}>
                                <EditOrder toggleEdit={() => toggleEdit(1)}/>
                            </Grid>:
                            <Grid container item xs={12}>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">Name: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right">{order.customerName}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">Date: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right">{moment(order.date).format('LLLL')}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">From: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right">{order?.originAddress?.placeName}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">To: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right">{order?.destinationAddress?.placeName}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">C. Phone: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right">{order.customerPhoneNumber}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">D. Phone: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right">{order.destinationPhoneNumber}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">Distance: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right">{order?.distance?.distance?.text}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">TimerW: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right">{order.timerW}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">Order Status: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right">{orderStatusToText(order.orderStatus)}</Typography></Grid>
                                </Grid>
                            </Grid>}
                        </Grid>
                    </Card>
                </Grid>
                <Grid container item xs={12} md={6}>
                    <Grid item xs={12}>
                        <Card className={classes.cardWrapper}>
                            <Grid container>
                                <Grid container item xs={12} justifyContent="space-between">
                                    <Grid item><Typography variant="h4" color="primary">Billing details</Typography></Grid>
                                    <Grid item>
                                        <Avatar onClick={()=>toggleEdit(2)}><AiFillEdit/></Avatar>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                            </Grid>
                            {toggleNumber===2?
                            <Grid item xs={12}>
                                <EditBilling toggleEdit={() => toggleEdit(2)}/>
                            </Grid>:
                            <Grid container item xs={12}>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">Base Charge: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right" style={{color: 'green'}}>{order.baseCharge}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">Promo Discount: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right" color="error">{order.promoDiscount && ` - ${order.promoDiscount}`}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">Extra Discount: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right" color="error">{order.extraDiscount && ` - ${order.extraDiscount}`}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">Toll Tax: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right" style={{color: 'green'}}>{order.tollTax && ` + ${order.tollTax}`}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">Road Tax: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right" style={{color: 'green'}}>{order.roadTax && ` + ${order.roadTax}`}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">Additional: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right" style={{color: 'green'}}>{order.additional && ` + ${order.additional}`}</Typography></Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={4}><Typography variant="h6">Payment Status: </Typography></Grid>
                                    <Grid item xs={8}><Typography variant="subtitle1" align="right">{order.paymentDone? 'Done': 'Pending'}</Typography></Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <WhatsAppSendMessage data={{baseCharge:order.baseCharge , promoDiscount: order.promoDiscount,  extraDiscount: order.extraDiscount,  tollTax: order.tollTax,  roadTax: order.roadTax,  additional: order.additional}} title="Billing" customerPhoneNumber={order.customerPhoneNumber}/>
                                </Grid>
                            </Grid>}
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.cardWrapper}>
                            <Grid container>
                                <Grid container item xs={12} justifyContent="space-between">
                                    <Grid item><Typography variant="h4" color="primary">Reference details</Typography></Grid>
                                    <Grid item>
                                        <Avatar onClick={()=>toggleEdit(3)}><AiFillEdit/></Avatar>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4}><Typography variant="h6">R. Phonne: </Typography></Grid>
                                <Grid item xs={8}><Typography variant="subtitle1" align="right">{order.referencePhoneNumber}</Typography></Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>)}
    </Wrapper>
}

interface IInput{
    target: {
        name: any,
        type: string,
        value: any,
    }
}

const EditOrder = (props: any) =>{
    const deliveryOrderState = useSelector((state: IRootState)=> state.deliveryOrder.orderForm)
    const order = useSelector((state: IRootState)=> state.deliveryOrder.order)

    const changeableOrderFields = ["customerName", "customerPhoneNumber", "destinationPhoneNumber"]
    const [showError, setShowError]= useState(false)
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleInputChange = (input: IInput) =>{
        let key = input.target.name
        let value = input.target.type==="number"?parseInt(input.target.value):input.target.value //doing this because material ui input return values in string format. This needs to be improved by making a seperate component for textfield input and handling parseInt in that component
        dispatch(updateOrderField(input.target.name,{...deliveryOrderState[input.target.name as keyof typeof deliveryOrderState], value: value}))
    }
    
    const onSubmit = () => {
        //Todo: Fix 
        setShowError(true)
        let newdeliveryOrderState = (({customerName, customerPhoneNumber, destinationPhoneNumber})=> ({customerName, customerPhoneNumber, destinationPhoneNumber}))(deliveryOrderState);
        let x = dispatch(updateOrder("order",newdeliveryOrderState, order._id))
        props.toggleEdit()
    }

    useEffect(()=>{
        changeableOrderFields.forEach(fieldName=>{
            dispatch(updateOrderField(fieldName,{...deliveryOrderState[fieldName as keyof typeof deliveryOrderState], value: order[fieldName]}))
        })
    },[])

    return <Grid container item xs={12}>
        <Grid item xs={12}>
                <TextField fullWidth label="Name" variant="outlined" size="small" className={classes.textBox} onChange={handleInputChange} name="customerName" value={deliveryOrderState.customerName.value} error={showError && deliveryOrderState.customerName.validation} helperText={showError && <>{deliveryOrderState.customerName.validation}</>}/>
        </Grid>
        <Grid item xs={12}>
            <TextField fullWidth label="Customer Phone number" variant="outlined" size="small" className={classes.textBox} onChange={handleInputChange} name="customerPhoneNumber" value={deliveryOrderState.customerPhoneNumber.value}  error={showError && deliveryOrderState.customerPhoneNumber.validation} helperText={showError && <>{deliveryOrderState.customerPhoneNumber.validation}</>}/>
        </Grid>
        <Grid item xs={12}>
            <TextField fullWidth label="Destination Phone number" variant="outlined" size="small" className={classes.textBox} onChange={handleInputChange} name="destinationPhoneNumber" value={deliveryOrderState.destinationPhoneNumber.value}  error={showError && deliveryOrderState.destinationPhoneNumber.validation} helperText={showError && <>{deliveryOrderState.destinationPhoneNumber.validation}</>}/>
        </Grid>
        <Grid container item xs={12} justifyContent="flex-end">
            <Grid item><Button size="small" variant="outlined" className={classes.smallButton} onClick={props.toggleEdit}>Cancel</Button></Grid>
            <Grid item><Button size="small" className={classes.smallButton} onClick={onSubmit}>Save</Button></Grid>
        </Grid>
    </Grid>
}

const EditBilling = (props: any) =>{
    const deliveryOrderState = useSelector((state: IRootState)=> state.deliveryOrder.orderForm)
    const order = useSelector((state: IRootState)=> state.deliveryOrder.order)

    const changeableOrderFields = ["promoDiscount", "extraDiscount", "tollTax", "roadTax", "additional"]
    const [showError, setShowError]= useState(false)
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleInputChange = (input: IInput) =>{
        let key = input.target.name
        let value = input.target.type==="number"?parseInt(input.target.value):input.target.value //doing this because material ui input return values in string format. This needs to be improved by making a seperate component for textfield input and handling parseInt in that component
        dispatch(updateOrderField(input.target.name,{...deliveryOrderState[input.target.name as keyof typeof deliveryOrderState], value: value}))
    }
    
    const onSubmit = () => {
        //Todo: Fix 
        setShowError(true)
        let newdeliveryOrderState = (({promoDiscount, extraDiscount, tollTax, roadTax, additional})=> ({promoDiscount, extraDiscount, tollTax, roadTax, additional}))(deliveryOrderState);
        dispatch(updateOrder("billing",newdeliveryOrderState, order._id))
        props.toggleEdit()
    }

    useEffect(()=>{
        changeableOrderFields.forEach(fieldName=>{
            dispatch(updateOrderField(fieldName,{...deliveryOrderState[fieldName as keyof typeof deliveryOrderState], value: order[fieldName]}))
        })
    },[])

    return <Grid container item xs={12}>
        <Grid item xs={12}>
            <TextField label="Promo Discount" type='number' variant="outlined" size="small"  className={classes.textBox} onChange={handleInputChange} name="promoDiscount" value={deliveryOrderState.promoDiscount.value.toString()}  error={showError && deliveryOrderState.promoDiscount.validation} helperText={showError && <>{deliveryOrderState.promoDiscount.validation}</>}/>
        </Grid>
        <Grid item xs={12}>
            <TextField label="Extra Discount" type='number' variant="outlined" size="small"  className={classes.textBox} onChange={handleInputChange} name="extraDiscount" value={deliveryOrderState.extraDiscount.value.toString()}  error={showError && deliveryOrderState.extraDiscount.validation} helperText={showError && <>{deliveryOrderState.extraDiscount.validation}</>}/>
        </Grid>
        <Grid item xs={12}>
            <TextField label="Toll Tax" type='number' variant="outlined" size="small"  className={classes.textBox} onChange={handleInputChange} name="tollTax" value={deliveryOrderState.tollTax.value.toString()}  error={showError && deliveryOrderState.tollTax.validation} helperText={showError && <>{deliveryOrderState.tollTax.validation}</>}/>
        </Grid>
        <Grid item xs={12}>
            <TextField label="Raod Tax" type='number' variant="outlined" size="small"  className={classes.textBox} onChange={handleInputChange} name="roadTax" value={deliveryOrderState.roadTax.value.toString()}  error={showError && deliveryOrderState.roadTax.validation} helperText={showError && <>{deliveryOrderState.roadTax.validation}</>}/>
        </Grid>
        <Grid item xs={12}>
            <TextField label="Additional" type='number' variant="outlined" size="small"  className={classes.textBox} onChange={handleInputChange} name="additional" value={deliveryOrderState.additional.value.toString()}  error={showError && deliveryOrderState.additional.validation} helperText={showError && <>{deliveryOrderState.additional.validation}</>}/>
        </Grid>
        <Grid container item xs={12} justifyContent="flex-end">
            <Grid item><Button size="small" variant="outlined" className={classes.smallButton} onClick={props.toggleEdit}>Cancel</Button></Grid>
            <Grid item><Button size="small" className={classes.smallButton} onClick={onSubmit}>Save</Button></Grid>
        </Grid>
    </Grid>
}

export default ViewOrder