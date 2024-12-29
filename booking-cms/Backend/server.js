// server.js

const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const db = require("./config/db");

// Routes
const loginRoute = require("./routes/login");

app.use(express.json());
app.use(cors());

// Use the login route for any requests to /api/login
app.use("/api/login", loginRoute);

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
