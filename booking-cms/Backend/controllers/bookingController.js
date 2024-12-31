const Booking = require("../models/booking");

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
        console.error("Error creating booking:", err);
        return res.status(500).json({ error: "Failed to create booking." });
      }
      res
        .status(201)
        .json({ message: "Booking created successfully.", bookingId });
    }
  );
};

module.exports = { createBooking };
