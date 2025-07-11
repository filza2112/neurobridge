const mongoose = require("mongoose");

const SimonSchema = new mongoose.Schema({
  userId: String,
  sequence: [String],
  userInput: [String],
  correct: Boolean,
  level: Number,
  timeTaken: Number,
  difficulty: String,
  timestamp: Date,
});

module.exports = mongoose.model("SimonResult", SimonSchema);
