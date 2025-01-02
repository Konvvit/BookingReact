const { db } = require("../config/db");

const Booking = {
  // Method to create a booking and associate multiple services
  create: async (
    service_ids, // Array of service IDs
    booking_date,
    booking_time,
    customer_name,
    customer_phone,
    customer_email
  ) => {
    try {
      // First, create the booking
      const bookingSql = `
        INSERT INTO bookings 
        (booking_date, booking_time, customer_name, customer_phone, customer_email) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const bookingParams = [
        booking_date,
        booking_time,
        customer_name,
        customer_phone,
        customer_email,
      ];

      const bookingResult = await new Promise((resolve, reject) => {
        db.run(bookingSql, bookingParams, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID); // Return the newly created booking ID
          }
        });
      });

      const bookingId = bookingResult;

      // Insert into booking_services for each service ID
      const serviceSql = `
        INSERT INTO booking_services (booking_id, service_id) 
        VALUES (?, ?)
      `;

      // Using async/await with Promise.all for all services
      const servicePromises = service_ids.map(
        (service_id) =>
          new Promise((resolve, reject) => {
            db.run(serviceSql, [bookingId, service_id], (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          })
      );

      await Promise.all(servicePromises);

      return bookingId; // Return the booking ID after all services are associated
    } catch (err) {
      throw new Error("Failed to create booking: " + err.message);
    }
  },

  // Method to get all bookings with their associated services
  getAllBookings: async () => {
    const sql = `
      SELECT 
        bookings.id AS booking_id,
        bookings.booking_date,
        bookings.booking_time,
        bookings.customer_name,
        bookings.customer_phone,
        bookings.customer_email,
        GROUP_CONCAT(services.name) AS services
      FROM bookings
      LEFT JOIN booking_services ON bookings.id = booking_services.booking_id
      LEFT JOIN services ON booking_services.service_id = services.id
      GROUP BY bookings.id
    `;

    try {
      const rows = await new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      return rows; // Return all bookings with associated services
    } catch (err) {
      throw new Error("Failed to fetch bookings: " + err.message);
    }
  },
};

module.exports = Booking;
