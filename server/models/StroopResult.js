const mongoose = require("mongoose");

const StroopResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  difficulty: { type: String, default: "medium" }, 
  accuracy: { type: Number, required: true }, // in percentage
  avgTime: { type: Number, required: true }, // in milliseconds
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("StroopResult", StroopResultSchema);
