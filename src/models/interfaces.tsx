export interface OrderRow {
  id: number,
  customerName: string,
  originAddress: string,
  destinationAddress: string,
  customerPhoneNumber: number,
  destionationPhoneNumber:  number,
  distance: number,
  baseCharge: number,
  deliveryPartner:  number,
  deliveryStartTime: string,
  loadEndTime:  string,
  unloadStartTime:  string,
  deliveryEndTime:  string,
}

export interface DriverRow {
  id: number,
  driverName: string,
  currentOrderID: number,
  driverAddress: string,
  driverPhoneNumber: string,
  licenseNumber: number,
  licensePhoto:  string,
  driverPhoto: string,
  currentVehicleId: number
}

export interface VehicleRow {
  id: number,
  ownerName: string,
  ownerAddress: string,
  ownerPhoneNumber: string,
  vehicleRegisterationNumber: string,
  addressProofType: string,
  addressProofPhoto: string,
  vehicleModelId: number,
  currentDriverId: number
}