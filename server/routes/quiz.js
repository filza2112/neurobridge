// routes/quiz.js
const express = require("express");
const router = express.Router();
const QuizQuestion = require("../models/QuizQuestion");
const Quiz = require("../models/Quiz");

// Get all quiz questions
router.get("/quiz-questions", async (req, res) => {
  try {
    const questions = await QuizQuestion.find({});
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    res.status(500).json({ error: "Failed to fetch quiz questions" });
  }
});

router.get("/weekly-questions/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const latestFirstQuiz = await Quiz.findOne({
      userId,
      type: "first",
    }).sort({ submittedAt: -1 });

    if (!latestFirstQuiz) {
      return res
        .status(404)
        .json({ error: "First quiz not found for this user" });
    }

    const primaryCondition = latestFirstQuiz.primaryCondition;

    const weeklyQuestions = await QuizQuestion.find({
      type: "weekly",
      category: primaryCondition,
    });

    res.status(200).json({
      primaryCondition,
      questions: weeklyQuestions,
    });
  } catch (error) {
    console.error("Error fetching weekly questions:", error);
    res.status(500).json({ error: "Failed to fetch weekly quiz questions" });
  }
});


// Submit quiz (first, weekly, or comic)
router.post("/submit-quiz", async (req, res) => {
  const { userId, type, responses } = req.body;

  if (!userId || !type || !Array.isArray(responses)) {
    return res.status(400).json({ error: "Invalid request format" });
  }

  try {
    const questionIds = responses.map((r) => r.questionId);
    const questions = await QuizQuestion.find({ id: { $in: questionIds } });

    // Score tracking
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

    // Determine primary condition (first quiz only)
    let primaryCondition = "None";
    if (type === "first") {
      primaryCondition = Object.entries(scores).reduce((max, curr) =>
        curr[1] > max[1] ? curr : max
      )[0];
    }

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
