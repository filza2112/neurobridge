const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// =======================
// SCHEMAS
// =======================

// Tab visibility schema
const focusSchema = new mongoose.Schema({
  userId: String,
  timestamp: Date,
  visible: Boolean,
});

// Session duration schema
const sessionSchema = new mongoose.Schema({
  userId: String,
  sessionStart: Date,
  sessionEnd: Date,
  durationSeconds: Number,
});

// CPT test logs (individual attempts)
const cptSchema = new mongoose.Schema({
  userId: String,
  shownLetter: String,
  responseTime: Date,
  isCorrect: Boolean,
  sequence: [String],
});

// CPT test summary (aggregated result)
const cptSummarySchema = new mongoose.Schema({
  userId: String,
  total: Number,
  correct: Number,
  incorrect: Number,
  accuracy: Number,
  endedAt: Date,
});

// CPTLog model definition (embedded for self-containment)
const cptLogSchema = new mongoose.Schema({
  userId: String,
  shownLetter: String,
  responseTime: Date,
  isCorrect: Boolean,
  sequence: [String],
  timestamp: { type: Date, default: Date.now },
});


// =======================
// MODELS
// =======================
const FocusLog = mongoose.model("FocusLog", focusSchema);
const SessionLog = mongoose.model("SessionLog", sessionSchema);
const CPTLog = mongoose.model("CPTLog", cptSchema);
const CPTLogSchema = mongoose.model("CPTLogSchema", cptLogSchema);
const CPTSummary = mongoose.model("CPTSummary", cptSummarySchema);

// =======================
// ROUTES
// =======================

// Save tab visibility
router.post("/visibility", async (req, res) => {
  try {
    const log = new FocusLog(req.body);
    await log.save();
    res.status(201).json({ message: "Focus log saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save session duration
router.post("/session", async (req, res) => {
  try {
    const log = new SessionLog(req.body);
    await log.save();
    res.status(201).json({ message: "Session saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save CPT test attempt
router.post("/cpt", async (req, res) => {
  try {
    const log = new CPTLog(req.body);
    await log.save();
    res.status(201).json({ message: "CPT entry saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save CPT test summary
router.post("/cpt-summary", async (req, res) => {
  try {
    const summary = new CPTSummary(req.body);
    await summary.save();
    res.status(201).json({ message: "CPT summary saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: GET /api/focus/all?userId=demo-user
router.get("/all", async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in query" });
    }

    const focusLogs = await FocusLog.find({ userId }).sort({ timestamp: 1 });
    const cptLogs = await CPTLog.find({ userId }).sort({ timestamp: 1 });

    res.json({
      focusLogs,
      cptLogs
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = {router, FocusLog, SessionLog, CPTLog, CPTSummary, CPTLogSchema};