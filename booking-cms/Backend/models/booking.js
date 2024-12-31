const { db } = require("../config/db");

const Booking = {
  create: (
    service_id,
    booking_date,
    booking_time,
    customer_name,
    customer_phone,
    customer_email,
    callback
  ) => {
    const sql = `
      INSERT INTO bookings 
      (service_id, booking_date, booking_time, customer_name, customer_phone, customer_email) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    const params = [
      service_id,
      booking_date,
      booking_time,
      customer_name,
      customer_phone,
      customer_email,
    ];

    db.run(sql, params, function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, this.lastID); // Return the ID of the newly created booking
    });
  },
};

module.exports = Booking;
