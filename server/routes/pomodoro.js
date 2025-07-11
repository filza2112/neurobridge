const express = require("express");
const router = express.Router();
const PomodoroSession = require("../models/PomodoroSession");

// POST: Save session
router.post("/save", async (req, res) => {
  try {
    const { userId, sessionLength, breakLength, completedPomodoros } = req.body;

    const session = new PomodoroSession({
      userId,
      sessionLength,
      breakLength,
      completedPomodoros,
    });

    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to save session." });
  }
});

// GET: Get all sessions of a user
router.get("/:userId", async (req, res) => {
  try {
    const sessions = await PomodoroSession.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions." });
  }
});

module.exports = router;
