const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Import JWT for token authentication
const { db, PORT } = require("./config/db");
const routes = require("./routes");

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // To handle CORS issues

// JWT Authentication Middleware (for protected routes)
const authenticateJWT = (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1]; // Extract JWT token from Authorization header

  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }

  jwt.verify(token, "yourSecretKey", (err, user) => {
    if (err) {
      return res.status(403).send("Access denied. Invalid token.");
    }
    req.user = user; // Attach the decoded user data to the request object
    next();
  });
};

// Routes
app.use("/api", routes); // Include all routes from routes/index.js

// Health Check Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Protected Route Example (Booking)
app.use("/api/bookings", authenticateJWT); // Protect this route with JWT middleware

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
