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
router.get("/top-triggers/:userId", chatController.getTopTriggers);

module.exports = router;

