const mongoose = require("mongoose");

const ChatLogSchema = new mongoose.Schema({
  userId: String,
  text: String,
  sentiment: String,
  score: Number,
  tone: String,
  keywords: [String],
  timestamp: Date,
  alert_triggered: Boolean,
});

module.exports = mongoose.model("ChatLog", ChatLogSchema);


