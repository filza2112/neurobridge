//routes//chatrouts.js

const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const EmotionTrigger = require("../models/EmotionTrigger");

router.post("/analyze", chatController.analyzeMessage);
router.get("/logs/:userId", chatController.getUserLogs);
router.get("/summary/:userId", chatController.getSummary);

// Route for Gemini-generated follow-up response
router.post("/respond", chatController.getGeminiResponse);

router.get("/:userId", async (req, res) => {
  try {
    const triggers = await EmotionTrigger.find({ userId: req.params.userId });
    res.json(triggers);
  } catch (err) {
    console.error("Error fetching emotion triggers:", err);
    res.status(500).json({ error: "Failed to fetch emotion triggers" });
  }
});

module.exports = router;

