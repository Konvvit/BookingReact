import axios from "axios";

// Bas-URL för API
const API_BASE_URL = "http://localhost:5001/api";

// Exempel: Hämta alla tjänster
export const fetchServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// Exempel: Skicka en bokning
export const createBooking = async (bookingDetails: any, token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

// Exempel: Hämta bokningar (admin-sida)
export const fetchBookings = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};
