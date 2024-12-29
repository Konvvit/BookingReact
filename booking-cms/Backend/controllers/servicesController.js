const db = require("../config/db");

// Get all services
exports.getAllServices = (req, res) => {
  db.all("SELECT * FROM Services", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};
