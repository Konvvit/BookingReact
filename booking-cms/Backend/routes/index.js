// In routes/index.js
const express = require("express");
const router = express.Router();

// Route imports
const loginRoute = require("./login"); // Ensure the correct path
const bookingsRoute = require("./bookings");
const servicesRoute = require("./services");

router.use("/login", loginRoute); // Make sure login route is included
router.use("/bookings", bookingsRoute);
router.use("/services", servicesRoute);

module.exports = router;
