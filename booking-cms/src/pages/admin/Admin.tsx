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

type Booking = {
  id: number;
  service_id: number;
  customer_name: string; 
  booking_date: string;
  booking_time: string;
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

      const response = await axios.get<Booking[]>("http://localhost:5001/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Bookings fetched:", response.data); // Debugging line
      if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
          setError("No bookings found.");
        } else {
          setBookings(response.data); // Store bookings in state
          console.log("Bookings state updated:", response.data); // Debugging line
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
              <TableCell>Service</TableCell>
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
                <TableRow key={booking.id}>
                <TableCell>{booking.service_id}</TableCell> {/* Assuming service_id maps to a service name */}
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






