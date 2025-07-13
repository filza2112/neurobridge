const express = require("express");
const router = express.Router();
const Distraction = require("../models/Distraction");

// POST: Log a distraction
router.post('/log', async (req, res) => {
  try {
    const { userId, type } = req.body;

    const newLog = new Distraction({ userId, type });
    await newLog.save();

    res.json({ success: true, log: newLog });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: 'Error logging distraction' });
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
