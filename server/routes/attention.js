const express = require("express");
const router = express.Router();
const StroopResult = require("../models/StroopResult");
const DigitSpanResult = require("../models/DigitSpanResult");
const SimonResult = require("../models/SimonResult");

router.post("/stroop", async (req, res) => {
  try {
    const data = req.body;
    const saved = await StroopResult.create(data);
    res.status(201).json(saved);
  } catch (error) {
    console.error("Stroop save error:", error);
    res.status(500).json({ error: "Failed to save stroop data" });
  }
});


// POST: Save Digit Span Result
router.post("/digit-span", async (req, res) => {
    try {
        const result = new DigitSpanResult(req.body);
        await result.save();
        res.status(201).json({ message: "Digit span result saved" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save digit span result" });
    }
});

// GET /api/attention/summary/:userId
router.get("/summary/:userId", async (req, res) => {
    const { userId } = req.params;

    const simon = await SimonResult.find({ userId }).sort({ timestamp: -1 }).limit(5);
    const digit = await DigitSpanResult.findOne({ userId }).sort({ timestamp: -1 });

    const simonAvgTime = simon.length
        ? Math.round(simon.reduce((sum, s) => sum + s.timeTaken, 0) / simon.length)
        : 0;

    res.json({
        simon: {
            maxLevel: Math.max(...simon.map((s) => s.level), 0),
            avgTime: simonAvgTime,
            accuracy: Math.round((simon.filter((s) => s.correct).length / simon.length) * 100) || 0,
            lastPlayed: simon[0]?.timestamp || null,
        },
        digit: {
            maxSpan: digit?.maxSpan || 0,
            correct: digit?.correct || 0,
            incorrect: digit?.incorrect || 0,
            lastPlayed: digit?.timestamp || null,
        },
    });
});



// POST: Simon Says
router.post("/simon", async (req, res) => {
    try {
        const result = new SimonResult(req.body);
        await result.save();
        res.status(201).json({ message: "Simon Says result saved" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save simon result" });
    }
});

// GET: Simon Says results
router.get("/simon/:userId", async (req, res) => {
  const data = await SimonResult.find({ userId: req.params.userId });
  res.json(data);
});

// GET: Stroop Test results
router.get("/stroop/:userId", async (req, res) => {
  const data = await StroopResult.find({ userId: req.params.userId });
  res.json(data);
});

// GET: Digit Span results
router.get("/digit/:userId", async (req, res) => {
  const data = await DigitSpanResult.find({ userId: req.params.userId });
  res.json(data);
});


module.exports = router;
