// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: String,
  date: String, // e.g., "2025-07-03"
  title: String,
  type: { type: String, enum: ["smart", "personal"] },
  estimatedTime: Number, // in minutes
  completed: { type: Boolean, default: false },
  conditions: [String],
  moodLevel: Number, // 0–100 (for smart reordering)
  focusLevel: Number, // 0–1
});

module.exports = mongoose.model("Task", taskSchema);
