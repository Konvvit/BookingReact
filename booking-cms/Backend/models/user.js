const bcrypt = require("bcrypt");
const { db } = require("../config/db"); // Make sure the path to your db is correct

const User = {
  create: async (email, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
      return new Promise((resolve, reject) => {
        db.run(sql, [email, hashedPassword], function (err) {
          if (err) reject(err);
          resolve(this.lastID); // Resolve with the last inserted row ID
        });
      });
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  },

  findByEmail: async (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
      console.log("Executing query:", sql, "with email:", email);
      const startTime = Date.now(); // Log start time
      db.get(sql, [email], (err, row) => {
        const endTime = Date.now(); // Log end time
        console.log(`Query execution time: ${endTime - startTime}ms`); // Log duration
        if (err) {
          console.error("Error executing SQL query:", err);
          reject(err);
        }
        resolve(row);
      });
    });
  },
};

module.exports = User;
