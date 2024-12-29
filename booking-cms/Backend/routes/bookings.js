const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookingsController");

// Add a booking
router.post("/", bookingsController.createBooking);

// Get all bookings
router.get("/", bookingsController.getAllBookings);

module.exports = router;
