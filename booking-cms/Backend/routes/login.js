// routes/login.js

const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

// Register new user (login route now)
router.post("/", loginController.register);

module.exports = router;
