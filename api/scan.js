let scannedQRCodes = {}; // In-memory storage

module.exports = async (req, res) => {
  try {
    const { qr_id } = req.query;

    if (!qr_id) {
      return res.status(400).json({ message: "QR ID is required" });
    }

    // Check if the QR code has already been scanned
    if (scannedQRCodes[qr_id]) {
      return res.json({ message: "QR already scanned!" });
    }

    // Mark the QR code as scanned
    scannedQRCodes[qr_id] = true;

    return res.json({ message: "This product is original!" });
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
