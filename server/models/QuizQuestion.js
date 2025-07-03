// models/QuizQuestion.js
const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema({
  id: String,
  category: String,
  type: { type: String }, // "likert" or "scenario"
  question: String,
  options: [
    {
      text: String,
      traits: [String],
      weight: Number,
    },
  ],
});

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
