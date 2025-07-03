const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Mood Schema
const moodSchema = new mongoose.Schema({
  userId: String,
  timestamp: Date,
  mood: Number,
  why: String,
});

const MoodLog = mongoose.model("MoodLog", moodSchema);

// POST: Save mood entry
router.post("/submit", async (req, res) => {
  try {
    const { userId, mood, why, timestamp } = req.body;

    const entry = new MoodLog({ userId, mood, why, timestamp });
    await entry.save();

    res.status(201).json({ message: "Mood saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Get mood history
router.get("/all", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const logs = await MoodLog.find({ userId }).sort({ timestamp: 1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example Express.js code
router.post("/api/mood/submit", async (req, res) => {
  const { userId, mood, label, emoji, why, timestamp } = req.body;

  try {
    await Mood.create({ userId, mood, label, emoji, why, timestamp }); // MongoDB model
    res.status(200).json({ message: "Mood saved" });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Failed to save mood" });
  }
});



module.exports = router;
