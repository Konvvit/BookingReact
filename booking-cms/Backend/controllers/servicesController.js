const { db } = require("../config/db");

exports.getAllServices = (req, res) => {
  db.all("SELECT * FROM services", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};
