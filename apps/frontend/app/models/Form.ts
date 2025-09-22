export interface Form {
  _id?: string;
  rideType: string;
  name?: string;
  companyName?: string;
  email: string;
  phone: string;
  passengers?: number;
  homeAddress?: string;
  departureLocation: string;
  departureDate: string; // ISO string instead of Date for transport
  departureTime?: string;
  destinationLocation: string;
  takeoffTime?: string;
  flightNumber?: string;
  return?: boolean;
  returnLocation?: string;
  returnDate?: string; // same reason, string is safer for frontend
  returnTime?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
