const express = require("express");
const router = express.Router();
const ServicesController = require("../controllers/servicesController");

router.get("/", ServicesController.getAllServices); // Adjust accordingly

module.exports = router;
