// models/user.js

const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// User Model: Contains the logic for user registration and fetching users.
const User = {
  // Method to create a new user
  create: (email, password, callback) => {
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) return callback(err);

      const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
      const params = [email, hashedPassword];
      db.run(sql, params, function (err) {
        if (err) return callback(err);
        callback(null, this.lastID);
      });
    });
  },

  // Method to find a user by email
  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    const params = [email];
    db.get(sql, params, callback);
  },
};

module.exports = User;
