const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { analyzeSentiment } = require("../services/sentiment");
const { classifyTone } = require("../services/tone");
const { transcribeAudio } = require("../services/stt");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Transcribe
    const transcript = await transcribeAudio(filePath);

    // Analyze
    const sentiment = await analyzeSentiment(transcript);
    const tone = await classifyTone(transcript);

    // 🧹 Clean up
    fs.unlinkSync(filePath);

    res.json({
      message: "Audio processed",
      transcript,
      sentiment,
      tone,
    });
  } catch (err) {
    console.error("Audio processing error:", err);
    res.status(500).json({ error: "Failed to process audio" });
  }
});

module.exports = router;
