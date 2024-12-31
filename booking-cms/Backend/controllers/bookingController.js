const Booking = require("../models/booking");
const { db } = require("../config/db");

// Create a new booking
const createBooking = (req, res) => {
  const {
    service_id,
    booking_date,
    booking_time,
    customer_name,
    customer_phone,
    customer_email,
  } = req.body;

  if (
    !service_id ||
    !booking_date ||
    !booking_time ||
    !customer_name ||
    !customer_phone ||
    !customer_email
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  Booking.create(
    service_id,
    booking_date,
    booking_time,
    customer_name,
    customer_phone,
    customer_email,
    (err, bookingId) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create booking." });
      }
      res
        .status(201)
        .json({ message: "Booking created successfully.", bookingId });
    }
  );
};

// Get all bookings (only for logged-in users)
const getAllBookings = (req, res) => {
  const sql = "SELECT * FROM bookings"; // Query to get all bookings, no user_id filter

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: "Failed to fetch bookings." });
    }

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No bookings found." });
    }

    // Return the bookings array directly
    return res.status(200).json(rows); // No wrapping object, just the array of bookings
  });
};

module.exports = { createBooking, getAllBookings };
