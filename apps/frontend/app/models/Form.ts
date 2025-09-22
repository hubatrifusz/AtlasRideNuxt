import { CalendarDate } from '@internationalized/date';

export interface Form {
  _id?: string;
  rideType: string;
  name?: string;
  companyName?: string;
  email: string;
  phone: string;
  passengers?: string;
  homeAddress?: string;
  departureLocation: string;
  departureDate: CalendarDate | null;
  departureTime?: string;
  destinationLocation: string;
  takeoffTime?: string;
  flightNumber?: string;
  return?: boolean;
  returnLocation?: string;
  returnDate?: CalendarDate | null;
  returnTime?: string;
  createdAt?: string;
  updatedAt?: string;
  comment?: string;
  __v?: number;
}
