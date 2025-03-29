export interface Booking {
  bookingId: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  bookForSomeoneElse: boolean;
  bookedFor?: {
    fullName: string;
    contactNumber: string;
    email: string;
  };
  pickupLocation: string;
  viaLocations?: string[];
  dropOffLocation: string;
  bookingDateTime: string;
  meetAndGreet: boolean;
  vehicleType: string;
  numberOfPassengers: number;
  numberOfSuitcases: number;
  numberOfCarryOnBags: number;
  requireChildSeat: boolean;
  childSeatDetails?: {
    boosterSeats?: number;
    infantSeats?: number;
    childSeats?: number;
  };
  arrivingByFlight: boolean;
  flightDetails?: string;
  comments?: string;
  returnJourney?: {
    pickupLocation: string;
    viaLocations?: string[];
    dropOffLocation: string;
    meetAndGreet: boolean;
    returnBookingDateTime: string;
    differentVehicle: boolean;
    vehicleType?: string;
    numberOfPassengers?: number;
    numberOfSuitcases?: number;
    numberOfCarryOnBags?: number;
    requireChildSeat?: boolean;
    childSeatDetails?: {
      boosterSeats?: number;
      infantSeats?: number;
      childSeats?: number;
    };
    arrivingByFlight?: boolean;
    flightDetails?: string;
    comments?: string;
  };
  discountCode?: string;
  bookingStatus: 'Pending' | 'Approved' | 'Completed' | 'Canceled';
}