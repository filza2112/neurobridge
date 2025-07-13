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
  accuracy: Number,
});

module.exports = mongoose.model("SimonResult", SimonSchema);
