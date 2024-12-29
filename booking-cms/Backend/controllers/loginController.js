// controllers/loginController.js

const User = require("../models/user");

const loginController = {
  // Register new user
  register: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user already exists
    User.findByEmail(email, (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (row) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Create new user
      User.create(email, password, (err, userId) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res
          .status(201)
          .json({ id: userId, message: "User registered successfully" });
      });
    });
  },
};

module.exports = loginController;
