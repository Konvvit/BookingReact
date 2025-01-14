// src/helpers/types.ts

// Booking details type (for API payloads)
export type BookingDetails = {
  services: number[];
  booking_date: string; // ISO format date
  booking_time: string; // Time in string format
  customer_name: string;
  customer_email: string;
  customer_phone: string;
};

// Booking type (for data fetched from the backend)
export type Booking = {
  booking_id: number;
  customer_name: string;
  booking_date: string;
  booking_time: string;
  services: {
    name: string;
    price: string;
  }[];
};
// Response type for login API
export type LoginResponse = {
  token: string;
  user: {
    email: string;
  };
};

// Error type for login failures
export type LoginError = {
  error: string;
};

// Response type for createBooking API
export type CreateBookingResponse = {
  booking_id: number; // ID of the created booking
  message: string; // Success message
};

// Define the Service type
export interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
}

// Define the props for the ServiceCard component
export interface ServiceCardProps {
  service: Service;
  onAdd?: (service: Service) => void;
  onRemove?: (service: Service) => void;
  isCartItem?: boolean;
}

