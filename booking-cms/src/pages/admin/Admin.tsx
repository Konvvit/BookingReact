import { useState, useEffect } from "react";
import { fetchBookings } from "../../helpers/api"; // Import centralized API function
import { Booking } from "../../helpers/types";
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



export default function Admin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string>("");

useEffect(() => {
  const loadBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const fetchedBookings = await fetchBookings(token);
      setBookings(fetchedBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err); // Log the error
      setError("Error fetching bookings. Please try again later.");
      setBookings([]); // Ensure bookings is always an array
    }
  };

  loadBookings();
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






