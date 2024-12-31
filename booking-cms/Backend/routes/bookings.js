const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/bookingController");
const verifyToken = require("../middlewares/authmiddleware"); // JWT middleware

// Create a booking (no authentication needed)
router.post("/", BookingController.createBooking);

// GET route to fetch all bookings, only for authenticated users
router.get("/", verifyToken, BookingController.getAllBookings);

module.exports = router;
