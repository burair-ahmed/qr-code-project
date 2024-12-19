const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Initialize SQLite database
const db = new sqlite3.Database(path.resolve("qr_data.db"));

db.run(
  "CREATE TABLE IF NOT EXISTS qr_codes (id TEXT PRIMARY KEY, scanned INTEGER, scan_time TEXT)"
);

module.exports = async (req, res) => {
  const { qr_id } = req.query;

  if (!qr_id) {
    return res.status(400).json({ message: "QR ID is required" });
  }

  db.get("SELECT scanned FROM qr_codes WHERE id = ?", [qr_id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (!row) {
      // First-time scan
      db.run(
        "INSERT INTO qr_codes (id, scanned, scan_time) VALUES (?, ?, ?)",
        [qr_id, 1, new Date().toISOString()],
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Database insert error" });
          }
          return res.json({ message: "This product is original!" });
        }
      );
    } else {
      // Already scanned
      return res.json({ message: "QR already scanned!" });
    }
  });
};
