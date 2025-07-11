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

//users can only take ifrst quiz one, if they wish to retake the progress->reset
router.get("/has-taken-first", async (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const firstQuiz = await Quiz.findOne({ userId, type: "first" });
    res.json({ hasTaken: !!firstQuiz });
  } catch (err) {
    console.error("Error checking first quiz status:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//reset progress
router.delete("/reset-progress", async (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const result = await Quiz.deleteMany({ userId });
    res.json({
      message: "All progress reset",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error("Error resetting quiz progress:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Submit quiz (first, weekly, or comic)
router.post("/submit-first-quiz", async (req, res) => {
  const { userId, type, responses } = req.body;

  if (!userId || type !== "first" || !Array.isArray(responses)) {
    return res.status(400).json({ error: "Invalid request format" });
  }

  try {
    // 🚫 Check if first-time quiz already exists
    const existing = await Quiz.findOne({ userId, type: "first" });
    if (existing) {
      return res
        .status(409)
        .json({ error: "First-time quiz already submitted." });
    }

    // Fetch only "first" type questions
    const questionIds = responses.map((r) => r.questionId);
    const questions = await QuizQuestion.find({
      id: { $in: questionIds },
      type: "first",
    });

    const scores = { ADHD: 0, OCD: 0, Autism: 0 };
    const answers = [];

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

      answers.push({
        question: question.question,
        answer: option.text,
        traits,
      });
    }

    const [primaryCondition, maxScore] = Object.entries(scores).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max)
    );

    const maxTraitMaxScore = questions
      .flatMap((q) =>
        q.options.filter((opt) => opt.traits.includes(primaryCondition))
      )
      .map((opt) => opt.weight)
      .reduce((a, b) => a + b, 0);

    const confidence = maxScore / (maxTraitMaxScore || 1);

    const quiz = new Quiz({
      userId,
      type: "first",
      inferredScores: scores,
      primaryCondition,
      confidence,
      answers,
      submittedAt: new Date(),
    });

    await quiz.save();

    const displayResult =
      confidence >= 0.6
        ? `You show patterns related to ${primaryCondition}.`
        : `You're fairly balanced, but show some traits leaning toward ${primaryCondition}.`;

    return res.status(201).json({
      message: "Quiz submitted",
      scores,
      primaryCondition,
      confidence,
      displayResult,
    });
  } catch (error) {
    console.error("Error submitting first quiz:", error);
    res.status(500).json({ error: "Server error" });
  }
});



router.post("/submit-quiz", async (req, res) => {
  const { userId, type, responses } = req.body;

  if (!userId || !type || !Array.isArray(responses)) {
    return res.status(400).json({ error: "Invalid request format" });
  }

  try {
    const questionIds = responses.map((r) => r.questionId);
    const questions = await QuizQuestion.find({ id: { $in: questionIds } });

    const scores = { ADHD: 0, OCD: 0, Autism: 0 };
    const answers = [];

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

      answers.push({
        question: question.question,
        answer: option.text,
        traits: option.traits,
      });
    }

    const [primaryCondition, maxScore] = Object.entries(scores).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max)
    );

    const quiz = new Quiz({
      userId,
      type,
      inferredScores: scores,
      primaryCondition,
      answers,
      submittedAt: new Date(),
    });

    const saved = await quiz.save();

    return res
      .status(201)
      .json({ message: "Quiz submitted", scores, primaryCondition });
  } catch (error) {
    console.error("Error in quiz-submit:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
