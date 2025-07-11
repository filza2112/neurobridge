const mongoose = require("mongoose");

const StroopResultSchema = new mongoose.Schema({
  userId: String,
  word: String,
  color: String,
  selectedColor: String,
  correct: Boolean,
  timeTaken: Number,
  difficulty: String,
  timestamp: Date,
});

module.exports = mongoose.model("StroopResult", StroopResultSchema);
