const ChatLog = require("../models/ChatLog");
const axios = require("axios");
const { sendEmailAlert } = require("../utils/sendEmailAlert"); // Use require if not using ES modules
const User = require("../models/user"); // To get user's alertEmail

exports.analyzeMessage = async (req, res) => {
  const { userId, text } = req.body;

  try {
    const sentimentRes = await axios.post("http://localhost:7002/sentiment", { text });
    const toneRes = await axios.post("http://localhost:7000/analyze-tone", req.body.audioBlob);
    const keywordsRes = await axios.post("http://localhost:7001/extract-keywords", { text });

    const sentiment = sentimentRes.data;
    const tone = toneRes.data.tone;
    const keywords = keywordsRes.data.keywords;

    const alertTriggered =
      sentiment.score < -0.7 || ["angry", "frustrated", "anxious"].includes(tone);

    const log = await ChatLog.create({
      userId,
      text,
      sentiment: sentiment.sentiment,
      score: sentiment.score,
      tone,
      trigger_keywords: keywords,
      timestamp: new Date(),
      alert_triggered: alertTriggered,
    });

    if (alertTriggered) {
      // Find the user's alert email
      const user = await User.findOne({ _id: userId });
      if (user && user.alertEmail) {
        await sendEmailAlert(
          user.alertEmail,
          "NeuroBridge Alert: Mood/Tone Triggered",
          `Alert for user ${user.name || user.email}: "${text}"`
        );
      }
    }

    res.json(log);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to analyze message" });
  }
};

exports.getUserLogs = async (req, res) => {
  const { userId } = req.params;
  const logs = await ChatLog.find({ userId }).sort({ timestamp: -1 });
  res.json(logs);
};

exports.getSummary = async (req, res) => {
  const { userId } = req.params;
  const logs = await ChatLog.find({ userId }).sort({ timestamp: -1 });
  const recent = logs.slice(0, 10);

  const triggers = {};
  recent.forEach((log) => {
    log.trigger_keywords.forEach((k) => {
      triggers[k] = (triggers[k] || 0) + 1;
    });
  });

  res.json({
    count: logs.length,
    recentMood: recent.map((l) => ({
      mood: l.sentiment,
      score: l.score,
      time: l.timestamp,
    })),
    triggers,
  });
};
