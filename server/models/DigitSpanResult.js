const mongoose = require("mongoose");

const DigitSpanSchema = new mongoose.Schema({
  userId: String,
  correct: Boolean,
  timeTaken: Number,
  difficulty: String,
  timestamp: Date,
  level:Number,
  accuracy: Number,
});

module.exports = mongoose.model("DigitSpanResult", DigitSpanSchema);
