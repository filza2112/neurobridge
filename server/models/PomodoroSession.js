const mongoose = require("mongoose");

const pomodoroSessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  sessionLength: { type: Number, required: true },  // in minutes
  breakLength: { type: Number, required: true },     // in minutes
  completedPomodoros: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PomodoroSession", pomodoroSessionSchema);
