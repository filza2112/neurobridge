// server/routes/quiz.js
const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

// Save any type of quiz
router.post("/", async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json({ message: "Quiz entry saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all quiz entries for a user
router.get("/", async (req, res) => {
  const { userId, type } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const filter = { userId };
    if (type) filter.type = type;

    const quizzes = await Quiz.find(filter).sort({ submittedAt: -1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
