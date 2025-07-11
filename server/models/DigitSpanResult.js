const mongoose = require("mongoose");

const DigitSpanSchema = new mongoose.Schema({
  userId: String,
  sequence: [Number],
  userInput: [Number],
  correct: Boolean,
  timeTaken: Number,
  difficulty: String,
  timestamp: Date,
  level:Number,
});

module.exports = mongoose.model("DigitSpanResult", DigitSpanSchema);
