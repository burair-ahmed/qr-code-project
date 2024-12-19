const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

async function generateQRCode() {
  const uniqueId = uuidv4();
  const qrPath = path.resolve("public/", `${uniqueId}.png`);
  await QRCode.toFile(qrPath, `https://qr-code-project-swart.vercel.app/api/scan?qr_id=${uniqueId}`);
  console.log(`QR Code generated: ${qrPath}`);
}

generateQRCode();
