// server/models/Quiz.js
const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  type: {
    type: String,
    enum: ["first", "weekly", "comic"],
    required: true,
  },

  // For first & weekly quiz
  inferredScores: {
    ADHD: { type: Number, default: 0 },
    OCD: { type: Number, default: 0 },
    Autism: { type: Number, default: 0 },
  },

  primaryCondition: {
    type: String,
    enum: ["ADHD", "OCD", "Autism", "None"],
    default: "None",
  },

  // For Mood Comic (optional fields)
  selectedComic: String, // For mood comic: e.g., "zoning-out.png"
  moodLabel: String, // Optional tag like "calm", "anxious"
  weekOf: String, // Optional for weekly quiz, e.g., "2025-W27"
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
