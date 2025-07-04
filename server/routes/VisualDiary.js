// server/index.js
const express = require("express");
const mongoose = require("mongoose");

const DiaryEntry = mongoose.model("DiaryEntry", new mongoose.Schema({
  userId: String,
  mood: String,
  timestamp: Date
}));

const app = express();

app.post("/api/diary", async (req, res) => {
  const { userId, mood, timestamp } = req.body;
  const entry = new DiaryEntry({ userId, mood, timestamp });
  await entry.save();
  res.status(201).json(entry);
});

app.get("/api/diary/:userId", async (req, res) => {
  const entries = await DiaryEntry.find({ userId: req.params.userId });
  res.json(entries);
});

module.exports = app;