const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { classifyTone } = require("../services/tone");
const { analyzeSentiment } = require("../services/sentiment");

const router = express.Router();

// Setup Multer for file uploads
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

/**
 * POST /api/audio/upload
 * Accepts audio file and processes it
 */
router.post("/upload", upload.single("audio"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Step 1: Transcribe audio (mock or use Whisper API)
    const transcript = "I’m feeling very tired today."; // TODO: Replace with real transcription

    // Step 2: Run NLP
    const sentiment = await analyzeSentiment(transcript);
    const tone = classifyTone(transcript);

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
