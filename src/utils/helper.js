// export const formatDate = (date,shortYear=false) => {
//     date = new Date(date)
//     const day = parseInt(date.getDate());
//     const month = parseInt(date.getMonth()) + 1;
//     const year = parseInt(date.getFullYear());
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
//     if (shortYear)
//         return (`${day > 9 ? '' : 0}${day} ${monthNames[month - 1]} ${year.toString().substr(-2)}`) // year-2000 will give us year in two digits
//     return (`${day > 9 ? '' : 0}${day} ${monthNames[month - 1]} ${year}`)
// }

// export const getMMDDYYYY = (date) => {
//     date = new Date(date)
//     return `${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getDate()}/${date.getFullYear()}`
// }

// export const getFutureDate = (date = new Date(), day = 0, month = 0, year = 0) => {
//     return (getMMDDYYYY(new Date(date.getFullYear() + year,date.getMonth() + month,date.getDate() + day)))
// }

// export const getFileDimensions = (url) => {
//     return new Promise(function (resolve, reject) {
//         var img = new Image();
//         img.onload = function () {
//             let width, height
//             width = this.width
//             height = this.height
//             URL.revokeObjectURL(url);
//             resolve({ width: width, height: height })
//         };
//         img.src = url;
//     })
// }

// export const replaceObjectFields = (oldObject, newObject) => {
//     Object.keys(newObject).forEach(key => {
//         oldObject[key] = newObject[key]
//     })
//     return oldObject
// }

// export const getValueFromObjectViaPath = (path, object) =>{
//     //Todo: In case if we need to get value from depth update this function so that it excepts string(path) in a format like profile.advanceProfile.stop.name and returns value
//     return object[path]
// }

export const baseChargeCalculate = (distance, chargeMultiplier) => {
    if(!distance)
        return {} //return empty object so that on validation this will through error
    return (((53.7239 - (5.9351*Math.log(parseFloat(distance))))*parseFloat(distance))/ chargeMultiplier)
}

export const getKeyValueObjectFromReduxObject = (reduxObj) =>{
    let resultObj = {};

    Object.keys(reduxObj).forEach(key => resultObj[key]=reduxObj[key].value);
    return resultObj;
}

export const restructureOrderForDataGrid = (order) => {
    return {
        charge: order.baseCharge - order.promoDiscount - order.extraDiscount,
        customerName: order.customerName,
        customerPhoneNumber: order.customerPhoneNumber,
        date: order.date,
        deliveryEndTime: order.deliveryEndTime,
        deliveryPartnerId: order.deliveryPartnerId,
        deliveryStartTime: order.deliveryStartTime,
        destinationAddress: order.destinationAddress.placeName,
        destinationPhoneNumber: order.destinationPhoneNumber,
        distance: order.distance.distance.text,
        loadEndTime: order.loadEndTime,
        orderStatus: order.orderStatus,
        originAddress: order.originAddress.placeName,
        timerW: order.timerW,
        unloadStartTime: order.unloadStartTime,
        extraDiscount: order.extraDiscount,
        promoDiscount: order.promoDiscount,
        referencePhoneNumber: order.referencePhoneNumber,
        id: order._id 
    }
}

export const restructureDriverForDataGrid = (driver)=>{
    return{
        ...driver,
        id: driver._id
    }
}

export const restructureDriverForCommonDataGrid = (driver)=>{
    return{
        ...driver,
        id: driver._id,
        select: null,
        name: driver.driverName,
        vehicleModel: driver.vehicleModel,
        vehicleNumber: "123",
        address: driver.driverAddress,
        licenseNumber: driver.licenseNumber,
        ownerName: driver.ownerName,
        ownerPhoneNumber: driver.ownerPhoneNumber
    }
}

export const restructureVehicleForCommonDataGrid = (vehicle)=>{
    return{
        ...vehicle,
        id: vehicle._id,
        name: vehicle.ownerName,
        vehicleModel: vehicle.vehicleModelId,
        vehicleNumber: vehicle.vehicleRegisterationNumber,
        address: "NA",
        licenseNumber: "NA"
    }
}

export const orderStatusToText = (orderStatus) =>{ 
    switch(orderStatus){
      case '1':
        return "Order placed";
        break;
      case '2':
        return "Vehicle reached at pickup point";
        break;
      case '3':
        return "Vehicle Left Pickup Point";
        break;
      case '4':
        return "Vehicle reached at destination point";
        break;
      case '5':
        return "Oehicle left at destination point";
        break;
      default:
        break;
    }
  }
  
export const getBillingTextForWhatsApp = (billing) =>{
  return `
  Here is your sample order billing:%0a

      Base Charge      : ${billing.baseCharge}%0a
      Promo Discount: ${billing.promoDiscount}%0a
      Extra Discount   : ${billing.extraDiscount}%0a
      Toll Tax               : ${billing.tollTax}%0a
      Road Tax           : ${billing.roadTax}%0a
      Additional         : ${billing.additional}%0a
      Total                  : ${billing.baseCharge - billing.promoDiscount - billing.extraDiscount + billing.tollTax + billing.roadTax + billing. additional}%0a

      %0a%0a
  यह है आपका सैंपल ऑर्डर बिलिंग:%0a

      बेस चार्ज             : ${billing.baseCharge}%0a
      प्रोमो डिस्काउंट    : ${billing.promoDiscount}%0a
      एक्स्ट्रा डिस्काउंट  : ${billing.extraDiscount}%0a
      टोल टैक्स            : ${billing.tollTax}%0a
      रोड टैक्स            : ${billing.roadTax}%0a
      इत्यादि               : ${billing.additional}%0a
      टोटल                 : ${billing.baseCharge - billing.promoDiscount - billing.extraDiscount + billing.tollTax + billing.roadTax + billing. additional}%0a

      %0a%0a
      (All values are in ₹)
  `
} 

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}