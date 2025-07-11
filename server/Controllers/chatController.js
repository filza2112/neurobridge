const ChatLog = require("../models/ChatLog");
const { analyzeSentiment } = require("../services/sentiment");
const { classifyTone } = require("../services/tone");
const { extractKeywords } = require("../services/keywords");
const { sendAlertEmail } = require("../services/email");

const NEGATIVE_THRESHOLD = -0.7;
const ALERT_TONES = ["angry", "anxious", "frustrated"];

exports.analyzeMessage = async (req, res) => {
  try {
    const { userId, text, email } = req.body;

    if (!userId || !text) {
      return res.status(400).json({ error: "Missing userId or text" });
    }

    const sentiment = await analyzeSentiment(text);
    const tone = await classifyTone(text);
    const keywords = await extractKeywords(text);

    const alertTriggered =
      sentiment.score < NEGATIVE_THRESHOLD || ALERT_TONES.includes(tone);

    const entry = new ChatLog({
      userId,
      text,
      timestamp: new Date(),
      sentiment: sentiment.sentiment,
      score: sentiment.score,
      tone,
      trigger_keywords: keywords,
      alert_triggered: alertTriggered,
    });

    await entry.save();

    // Optional: Send Email Alert
    if (alertTriggered && email) {
      await sendAlertEmail(
        email,
        "🛑 NeuroBridge Alert: Mood Warning",
        `User ${userId} has shown signs of distress.\n\nMessage: "${text}"\nTone: ${tone}\nSentiment score: ${sentiment.score}`
      );
    }

    res.json({
      sentiment,
      tone,
      keywords,
      alert_triggered: alertTriggered,
    });
  } catch (err) {
    console.error("Error in chatController:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all chat logs for a user (most recent first)
exports.getUserLogs = async (req, res) => {
  try {
    const { userId } = req.params;
    const logs = await ChatLog.find({ userId }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat logs" });
  }
};

// Get a summary of chat logs for a user
exports.getSummary = async (req, res) => {
  try {
    const { userId } = req.params;
    const logs = await ChatLog.find({ userId });

    const total = logs.length;
    const negative = logs.filter((log) => log.score < 0).length;
    const alerts = logs.filter((log) => log.alert_triggered).length;
    const avgScore = total
      ? logs.reduce((sum, log) => sum + (log.score || 0), 0) / total
      : 0;

    res.json({
      total,
      negative,
      alerts,
      avgScore,
      lastMessage: logs[0]?.text || null,
      lastTimestamp: logs[0]?.timestamp || null,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};
