// const express = require("express");
// const router = express.Router();
// const StroopResult = require("../models/StroopResult");
// const DigitSpanResult = require("../models/DigitSpanResult");
// const SimonResult = require("../models/SimonResult");



// // Save single Stroop attempt
// router.post("/stroop/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const {
//       word,
//       color,
//       selectedColor,
//       correct,
//       timeTaken,
//       difficulty,
//       timestamp,
//     } = req.body;

//     const result = new StroopResult({
//       userId,
//       word,
//       color,
//       selectedColor,
//       correct,
//       timeTaken,
//       difficulty,
//       timestamp,
//       accuracy: correct ? 100 : 0
//     });

//     await result.save();
//     res.status(201).json(result);
//   } catch (err) {
//     console.error("Error saving stroop result", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// // POST: Save Digit Span Result
// router.post("/digit/:userId", async (req, res) => {
//   try {
//     const { userId, correct, incorrect } = req.body;
//     const total = correct + incorrect;
//     const accuracy = total > 0 ? (correct / total) * 100 : 0;

//     const result = new DigitSpanResult({
//       userId,
//       correct,
//       incorrect,
//       level: correct, // you can adjust this logic
//       accuracy,
//     });

//     await result.save();
//     res.status(201).json(result);
//   } catch (err) {
//     console.error("Error saving digit span result", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// // GET /api/attention/summary/:userId
// router.get("/summary/:userId", async (req, res) => {
//   const { userId } = req.params;

//   const simon = await SimonResult.find({ userId }).sort({ timestamp: -1 }).limit(5);
//   const digit = await DigitSpanResult.findOne({ userId }).sort({ timestamp: -1 });

//   const simonAvgTime = simon.length
//     ? Math.round(simon.reduce((sum, s) => sum + s.timeTaken, 0) / simon.length)
//     : 0;

//   res.json({
//     simon: {
//       maxLevel: Math.max(...simon.map((s) => s.level), 0),
//       avgTime: simonAvgTime,
//       accuracy: Math.round((simon.filter((s) => s.correct).length / simon.length) * 100) || 0,
//       lastPlayed: simon[0]?.timestamp || null,
//     },
//     digit: {
//       maxSpan: digit?.maxSpan || 0,
//       correct: digit?.correct || 0,
//       incorrect: digit?.incorrect || 0,
//       lastPlayed: digit?.timestamp || null,
//     },
//   });
// });



// // POST: Simon Says
// router.post("/simon/:userId", async (req, res) => {
//   try {
//     const { userId, attempts } = req.body;

//     const total = attempts.length;
//     const correctCount = attempts.filter(a => a.correct).length;
//     const accuracy = total ? (correctCount / total) * 100 : 0;

//     const result = new SimonResult({
//       userId,
//       level: Math.max(...attempts.map(a => a.level)),
//       timeTaken: attempts.reduce((acc, a) => acc + a.timeTaken, 0) / total,
//       accuracy,
//     });

//     await result.save();
//     res.status(201).json(result);
//   } catch (err) {
//     console.error("Error saving simon result", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // GET Stroop results for a user
// router.get("/stroop/:userId", async (req, res) => {
//   try {
//     const results = await StroopResult.find({ userId: req.params.userId }).sort({ timestamp: -1 });
//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching Stroop results", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });



// // GET Digit Span results for a user
// router.get("/digit/:userId", async (req, res) => {
//   try {
//     const results = await DigitSpanResult.find({ userId: req.params.userId }).sort({ timestamp: -1 });
//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching Digit Span results", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // GET Simon Says results for a user
// router.get("/simon/:userId", async (req, res) => {
//   try {
//     const results = await SimonResult.find({ userId: req.params.userId }).sort({ timestamp: -1 });
//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching Simon results", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });




// module.exports = router;
// ✅ Updated Routes (Express.js)
const express = require("express");
const router = express.Router();
const StroopResult = require("../models/StroopResult");
const DigitSpanResult = require("../models/DigitSpanResult");
const SimonResult = require("../models/SimonResult");

// ----------------------------- STROOP -----------------------------
router.post("/stroop/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { attempts = [], difficulty = "medium" } = req.body;

    if (!Array.isArray(attempts) || attempts.length !== 10) {
      return res.status(400).json({ error: "Expected 10 attempts" });
    }

    const total = attempts.length;
    const correctCount = attempts.filter((a) => a.correct).length;
    const avgTime =
      attempts.reduce((sum, a) => sum + (a.timeTaken || 0), 0) / total;
    const accuracy = (correctCount / total) * 100;

    const summary = new StroopResult({
      userId,
      accuracy,
      avgTime,
      difficulty,
      timestamp: new Date(),
    });

    await summary.save();
    res.status(201).json(summary);
  } catch (err) {
    console.error("Error saving stroop result", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------------- DIGIT SPAN -----------------------------
router.post("/digit-span/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      sequence,
      userInput,
      correct,
      timeTaken,
      difficulty,
      timestamp,
      level,
    } = req.body;

    const result = new DigitSpanResult({
      userId,
      correct,
      level,
      timeTaken,
      difficulty,
      timestamp,
      accuracy: correct ? 100 : 0,
    });

    await result.save();
    res.status(201).json(result);
  } catch (err) {
    console.error("Error saving digit span result", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------------- SIMON SAYS -----------------------------
router.post("/simon/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      sequence,
      userInput,
      correct,
      level,
      timeTaken,
      difficulty,
      timestamp,
    } = req.body;

    const result = new SimonResult({
      userId,
      sequence,
      userInput,
      correct,
      level,
      timeTaken,
      difficulty,
      timestamp,
      accuracy: correct ? 100 : 0,
    });

    await result.save();
    res.status(201).json(result);
  } catch (err) {
    console.error("Error saving simon result", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------------- GET ATTEMPTS -----------------------------
router.get("/stroop/:userId", async (req, res) => {
  try {
    const results = await StroopResult.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(results);
  } catch (err) {
    console.error("Error fetching Stroop results", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/digit-span/:userId", async (req, res) => {
  try {
    const results = await DigitSpanResult.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(results);
  } catch (err) {
    console.error("Error fetching Digit Span results", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/simon/:userId", async (req, res) => {
  try {
    const results = await SimonResult.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(results);
  } catch (err) {
    console.error("Error fetching Simon results", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------------- SUMMARY -----------------------------
router.get("/summary/:userId", async (req, res) => {
  const { userId } = req.params;

  const [simon, digit, stroop] = await Promise.all([
    SimonResult.find({ userId }).sort({ timestamp: -1 }),
    DigitSpanResult.find({ userId }).sort({ timestamp: -1 }),
    StroopResult.find({ userId }).sort({ timestamp: -1 }),
  ]);

  const calcAvg = (arr, key) => arr.length ? arr.reduce((sum, x) => sum + (x[key] || 0), 0) / arr.length : 0;

  res.json({
    simon: {
      maxLevel: Math.max(...simon.map((s) => s.level), 0),
      accuracy: calcAvg(simon, "accuracy"),
      avgTime: calcAvg(simon, "timeTaken"),
      lastPlayed: simon[0]?.timestamp || null,
    },
    digit: {
      maxLevel: Math.max(...digit.map((d) => d.level), 0),
      accuracy: calcAvg(digit, "accuracy"),
      avgTime: calcAvg(digit, "timeTaken"),
      lastPlayed: digit[0]?.timestamp || null,
    },
    stroop: {
      accuracy: calcAvg(stroop, "accuracy"),
      avgTime: calcAvg(stroop, "avgTime"),
      lastPlayed: stroop[0]?.timestamp || null,
    },
  });
});

module.exports = router;
