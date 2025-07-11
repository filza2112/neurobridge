// server/models/Distraction.js
const mongoose = require("mongoose");

const DistractionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true }, // e.g., phone, noise
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Distraction", DistractionSchema);
