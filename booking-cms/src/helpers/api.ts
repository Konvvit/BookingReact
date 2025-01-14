import axios from "axios";
import { BookingDetails, Booking, LoginResponse, LoginError, CreateBookingResponse } from "./types";
// Bas-URL för API
const API_BASE_URL = "http://localhost:5001/api";

//  Hämta alla tjänster
export const fetchServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const createBooking = async (
  bookingDetails: BookingDetails,
  token: string
): Promise<CreateBookingResponse> => {
  try {
    const response = await axios.post<CreateBookingResponse>(`${API_BASE_URL}/bookings`, bookingDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return strongly typed response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating booking:", error.response?.data || error.message);
      throw error.response?.data || { error: "Failed to create booking." };
    } else {
      console.error("Unexpected error:", error);
      throw { error: "An unexpected error occurred." };
    }
  }
};




//  Get bookings (admin-page)
export const fetchBookings = async (token: string): Promise<Booking[]> => {
  try {
    const response = await axios.get<{ bookings: Booking[] }>(
      `${API_BASE_URL}/bookings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (Array.isArray(response.data.bookings)) {
      return response.data.bookings; // Return the bookings array
    } else {
      console.error("Invalid data format received:", response.data);
      return []; // Return an empty array if data format is invalid
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return []; // Return an empty array in case of an error
  }
};


// Function to handle user login
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login`, { email, password });
    return response.data; // Return the response data (e.g., token)
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during login:", error.response.data);
      throw error.response.data as LoginError; // Throw a strongly typed error
    } else {
      console.error("Unexpected error:", error);
      throw { error: "Login failed" } as LoginError;
    }
  }
};