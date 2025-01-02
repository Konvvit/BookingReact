const { db } = require("../config/db");

const bookingController = {
  // Method to create a booking
  createBooking: (req, res) => {
    const {
      services, // Array of service IDs
      booking_date,
      booking_time,
      customer_name,
      customer_phone,
      customer_email,
    } = req.body;

    // Validate request body
    if (
      !services ||
      !Array.isArray(services) ||
      services.length === 0 ||
      !booking_date ||
      !booking_time ||
      !customer_name ||
      !customer_phone ||
      !customer_email
    ) {
      return res.status(400).json({
        error: "All fields are required and services should be an array.",
      });
    }

    // Start a transaction to ensure the booking and services are added together
    db.serialize(() => {
      // Insert booking
      const sqlBooking = `
        INSERT INTO bookings (booking_date, booking_time, customer_name, customer_phone, customer_email)
        VALUES (?, ?, ?, ?, ?)
      `;
      const paramsBooking = [
        booking_date,
        booking_time,
        customer_name,
        customer_phone,
        customer_email,
      ];

      db.run(sqlBooking, paramsBooking, function (err) {
        if (err) {
          console.error("Error inserting booking:", err.message); // Log the error
          return res.status(500).json({ error: "Failed to create booking." });
        }

        const bookingId = this.lastID;

        // Insert services for this booking
        const sqlServices = `
          INSERT INTO booking_services (booking_id, service_id)
          VALUES (?, ?)
        `;
        const serviceParams = services.map((serviceId) => [
          bookingId,
          serviceId,
        ]);

        // Prepare the statement to insert multiple services
        const stmt = db.prepare(sqlServices);

        let serviceError = false;

        serviceParams.forEach((param) => {
          stmt.run(param, (err) => {
            if (err) {
              serviceError = true;
              console.error(
                "Error inserting service for booking:",
                err.message
              ); // Log the error
            }
          });
        });

        stmt.finalize(() => {
          if (serviceError) {
            return res
              .status(500)
              .json({ error: "Failed to associate services with booking." });
          }

          // Return success response after all services have been inserted
          res
            .status(201)
            .json({ message: "Booking created successfully.", bookingId });
        });
      });
    });
  },

  // Method to get all bookings with their associated services
  getAllBookings: (req, res) => {
    const sql = `
      SELECT 
        bookings.id AS booking_id,
        bookings.booking_date,
        bookings.booking_time,
        bookings.customer_name,
        bookings.customer_phone,
        bookings.customer_email,
        GROUP_CONCAT(services.name) AS services_names,
        GROUP_CONCAT(services.price) AS services_prices
      FROM bookings
      LEFT JOIN booking_services ON bookings.id = booking_services.booking_id
      LEFT JOIN services ON booking_services.service_id = services.id
      GROUP BY bookings.id
    `;

    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Error fetching bookings:", err.message);
        return res.status(500).json({ error: "Failed to fetch bookings." });
      }

      if (!rows || rows.length === 0) {
        console.log("No bookings found.");
        return res.status(404).json({ error: "No bookings found." });
      }

      // Format the services names and prices into an array of objects
      const bookings = rows.map((row) => {
        console.log("Row fetched:", row); // Debugging log for each row

        const servicesNames = row.services_names
          ? row.services_names.split(",")
          : [];
        const servicesPrices = row.services_prices
          ? row.services_prices.split(",")
          : [];

        // Check if servicesNames and servicesPrices have mismatched lengths
        if (servicesNames.length !== servicesPrices.length) {
          console.error("Mismatch between services names and prices:", row);
        }

        // Combine names and prices into an array of objects
        const services = servicesNames.map((name, index) => ({
          name: name,
          price: servicesPrices[index] || "N/A", // Default to 'N/A' if there's no price
        }));

        return {
          booking_id: row.booking_id,
          booking_date: row.booking_date,
          booking_time: row.booking_time,
          customer_name: row.customer_name,
          customer_phone: row.customer_phone,
          customer_email: row.customer_email,
          services: services, // Array of objects with service name and price
        };
      });

      console.log("Bookings formatted:", bookings); // Debugging log for formatted bookings

      res.status(200).json({ bookings });
    });
  },
};

module.exports = bookingController;
