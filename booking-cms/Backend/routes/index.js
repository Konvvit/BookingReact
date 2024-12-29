const express = require("express");
const router = express.Router();

// Route imports
const bookingsRoute = require("./bookings");
const servicesRoute = require("./services");

router.use("/bookings", bookingsRoute);
router.use("/services", servicesRoute);

module.exports = router;
