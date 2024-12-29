const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const app = express();
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "booking_system.sqlite"));
const cors = require("cors");
const saltRounds = 10;

app.use(express.json());
app.use(cors());

// During user registration (when adding a new user)
app.post("/api/users", (req, res) => {
  const { email, password } = req.body;

  // Hash the password before storing it
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    const params = [email, hashedPassword];

    db.run(sql, params, function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
  });
});

// Get all services
app.get("/api/services", (req, res) => {
  db.all("SELECT * FROM Services", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a booking
app.post("/api/bookings", (req, res) => {
  const { service_id, date, time, customer_name, customer_contact } = req.body;
  const sql = `INSERT INTO Bookings (service_id, date, time, customer_name, customer_contact) VALUES (?, ?, ?, ?, ?)`;
  const params = [service_id, date, time, customer_name, customer_contact];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// During login (check hashed password)
app.post("api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = `SELECT * FROM users WHERE email = ?`;
  const params = [email];

  db.get(sql, params, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the hashed password with the input password
    bcrypt.compare(password, row.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!result) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      res.status(200).json({
        id: row.id,
        email: row.email,
        message: "Login successful",
      });
    });
  });
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
