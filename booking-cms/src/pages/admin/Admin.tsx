import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

// Define the types according to the expected structure
type Service = {
  name: string;
  price: string;
};

type Booking = {
  booking_id: number;
  customer_name: string;
  booking_date: string;
  booking_time: string;
  services: Service[]; // Services should be an array
};

export default function Admin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await axios.get<{ bookings: Booking[] }>("http://localhost:5001/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log the raw response to verify the data format
        console.log("Raw response from backend:", response.data);

        // Ensure we are handling the 'bookings' property correctly
        if (Array.isArray(response.data.bookings)) {
          const invalidFormat = response.data.bookings.some((booking) => 
            !booking.booking_id || !booking.customer_name || !booking.booking_date || !booking.booking_time || !Array.isArray(booking.services)
          );

          if (invalidFormat) {
            setError("Invalid data format received.");
            return;
          }

          if (response.data.bookings.length === 0) {
            setError("No bookings found.");
          } else {
            setBookings(response.data.bookings);
          }
        } else {
          setError("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings. Please try again later.");
      }
    };

    fetchBookings();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Panel
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        All Bookings:
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Services</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.booking_id}>
                  <TableCell>
                    {booking.services.map((service, index) => (
                      <div key={index}>
                        <strong>{service.name}</strong> - ${service.price}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{booking.customer_name}</TableCell>
                  <TableCell>{booking.booking_date}</TableCell>
                  <TableCell>{booking.booking_time}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}







