const mongoose = require("mongoose");

const ChatLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  sentiment: {
    type: String,
    enum: ["positive", "negative", "neutral"],
  },
  score: {
    type: Number,
  },
  tone: {
    type: String,
  },
  trigger_keywords: {
    type: [String],
    default: [],
  },
  alert_triggered: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ChatLog", ChatLogSchema);
