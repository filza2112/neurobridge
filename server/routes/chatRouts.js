const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/analyze", chatController.analyzeMessage);
router.get("/logs/:userId", chatController.getUserLogs);
router.get("/summary/:userId", chatController.getSummary);

module.exports = router;

