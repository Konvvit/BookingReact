// authMiddleware.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret_key"; // Use your actual JWT secret key

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1]; // Extract JWT token from Authorization header

  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Access denied. Invalid token.");
    }
    req.user = user; // Attach the decoded user data to the request object
    next();
  });
};

module.exports = verifyToken;
