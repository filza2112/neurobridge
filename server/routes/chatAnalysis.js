import express from "express";
import { analyzeSentiment } from "../../ml/sentiment.js";
import { analyzeTone } from "../../ml/tone.js";
import { extractKeywords } from "../../ml/keywords.js";
import { saveChatToDB } from "../utils/saveChat.js"; // Utility for DB logging

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { userId, message, timestamp } = req.body;

    const sentimentResult = await analyzeSentiment(message);
    const toneResult = analyzeTone(message);
    const keywords = extractKeywords(message);

    const chatLog = {
      userId,
      message,
      timestamp: timestamp || new Date(),
      sentiment: sentimentResult.sentiment,
      score: sentimentResult.score,
      tone: toneResult.tone,
      keywords,
    };

    await saveChatToDB(chatLog); 

    res.status(200).json(chatLog);
  } catch (err) {
    console.error("Chat analysis error:", err);
    res.status(500).json({ error: "Failed to analyze chat" });
  }
});

export default router;
