// controllers/bookingsController.js
const Booking = require("../models/booking");

const bookingsController = {
  // Add a new booking
  addBooking: (req, res) => {
    const { service_id, date, time, customer_name, customer_contact } =
      req.body;

    // Check for conflicting time slot
    Booking.getByServiceAndDate(
      service_id,
      date,
      time,
      (err, existingBooking) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (existingBooking) {
          return res.status(400).json({ error: "Time slot is already booked" });
        }

        // Create the booking if no conflict
        Booking.create(
          service_id,
          date,
          time,
          customer_name,
          customer_contact,
          (err, bookingId) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res
              .status(201)
              .json({ id: bookingId, message: "Booking confirmed!" });
          }
        );
      }
    );
  },

  // Get all bookings
  getBookings: (req, res) => {
    Booking.getAll((err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(rows);
    });
  },
};

module.exports = bookingsController;
