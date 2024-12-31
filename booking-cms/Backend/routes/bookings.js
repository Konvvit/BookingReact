const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/bookingController");
const authenticateJWT = require("../middlewares/authmiddleware"); // JWT middleware

// Create a booking (no authentication needed)
router.post("/", BookingController.createBooking);

// Get all bookings (protected route, only for authenticated users)
router.get("/", authenticateJWT, (req, res) => {
  const sql = "SELECT * FROM bookings"; // Assuming bookings table exists

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: "Error fetching bookings" });
    }
    res.status(200).json({ bookings: rows });
  });
});

module.exports = router;
