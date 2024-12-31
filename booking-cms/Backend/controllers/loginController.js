const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "your_jwt_secret_key"; // Replace this with your secret key

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    console.log("Login request received with email:", email);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Validate password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email }, // Payload
        JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Expiry time
      );

      // Send response back to client
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error processing login:", error); // Log any errors
      res.status(500).json({ error: "An error occurred during login" });
    }
  },
};

module.exports = loginController;
