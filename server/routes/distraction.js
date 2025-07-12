const express = require("express");
const router = express.Router();
const Distraction = require("../models/Distraction");

// POST: Log a distraction
router.post("/log", async (req, res) => {
  const { userId, type } = req.body;
  try {
    const distraction = new Distraction({ userId, type });
    await distraction.save();
    res.status(201).json({ message: "Distraction logged" });
  } catch (err) {
    res.status(500).json({ error: "Error logging distraction" });
  }
});

// GET: Distraction frequency (for dashboard)
router.get("/summary/:userId", async (req, res) => {
  try {
    const data = await Distraction.aggregate([
      { $match: { userId: req.params.userId } },
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

module.exports = router;
