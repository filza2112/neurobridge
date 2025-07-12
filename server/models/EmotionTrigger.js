// models/EmotionTrigger.js
const mongoose = require("mongoose");

const emotionTriggerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  emotion: { type: String, required: true },
  score: { type: Number, required: true },
  trigger_keywords: { type: [String], required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmotionTrigger", emotionTriggerSchema);
