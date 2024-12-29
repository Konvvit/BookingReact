// models/booking.js

const db = require("../config/db"); // Ensure to import your database connection

const Booking = {
  // Create a new booking
  create: (
    service_id,
    date,
    time,
    customer_name,
    customer_contact,
    callback
  ) => {
    const sql = `INSERT INTO Bookings (service_id, date, time, customer_name, customer_contact) 
                 VALUES (?, ?, ?, ?, ?)`;
    const params = [service_id, date, time, customer_name, customer_contact];

    db.run(sql, params, function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, this.lastID); // Return the ID of the newly created booking
    });
  },

  // Get all bookings
  getAll: (callback) => {
    const sql = "SELECT * FROM Bookings";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows); // Return all rows in the Bookings table
    });
  },

  // Get bookings by service_id and date (to check for conflicts)
  getByServiceAndDate: (service_id, date, time, callback) => {
    const sql = `SELECT * FROM Bookings WHERE service_id = ? AND date = ? AND time = ?`;
    const params = [service_id, date, time];

    db.get(sql, params, (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row); // Return the booking if found, or null if not
    });
  },

  // Get a booking by ID
  getById: (id, callback) => {
    const sql = "SELECT * FROM Bookings WHERE id = ?";
    const params = [id];

    db.get(sql, params, (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row); // Return the booking by ID
    });
  },
};

module.exports = Booking;
