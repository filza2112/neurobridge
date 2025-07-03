// routes/quiz.js
const express = require("express");
const router = express.Router();
const QuizQuestion = require("../models/QuizQuestion");
const Quiz = require("../models/Quiz");

router.post("/submit-quiz", async (req, res) => {
  const { userId, type, responses } = req.body;
  /**
   * responses = [
   *   { questionId: 'adhd1', selectedOptionIndex: 3 },
   *   { questionId: 'autism2', selectedOptionIndex: 1 },
   *   ...
   * ]
   */

  if (!userId || !type || !Array.isArray(responses)) {
    return res.status(400).json({ error: "Invalid request format" });
  }

  try {
    const questionIds = responses.map((r) => r.questionId);
    const questions = await QuizQuestion.find({ id: { $in: questionIds } });

    // Init score counters
    const scores = { ADHD: 0, OCD: 0, Autism: 0 };

    for (const response of responses) {
      const question = questions.find((q) => q.id === response.questionId);
      const index = response.selectedOptionIndex;

      if (!question || !question.options[index]) continue;

      const option = question.options[index];
      const weight = option.weight || 0;
      const traits = option.traits || [];

      traits.forEach((trait) => {
        if (scores.hasOwnProperty(trait)) {
          scores[trait] += weight;
        }
      });
    }

    // Determine primary condition
    const primaryCondition =
      Object.entries(scores).reduce((max, curr) =>
        curr[1] > max[1] ? curr : max
      )[0] || "None";

    const quiz = new Quiz({
      userId,
      type,
      inferredScores: scores,
      primaryCondition,
    });

    await quiz.save();

    return res
      .status(201)
      .json({ message: "Quiz submitted", scores, primaryCondition });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
