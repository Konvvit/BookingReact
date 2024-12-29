exports.handleDatabaseError = (err, res) => {
  console.error(err.message);
  res.status(500).json({ error: "Database operation failed" });
};
