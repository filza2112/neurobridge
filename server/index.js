const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const focusModule = require("./routes/focus");
const moodModule = require("./routes/mood");
const routineRoutes = require("./routes/routine");
const quizRoutes = require("./routes/quiz");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    console.log("Using DB:", mongoose.connection.name);
  })
  .catch((err) => console.error("MongoDB error:", err));

// Ensure we're using the correct router from modules that export multiple items
app.use('/auth', authRoutes);
app.use("/api/focus", focusModule.router || focusModule);
app.use("/api/mood", moodModule.router || moodModule);
app.use("/api/tasks", routineRoutes); // This exports only router
app.use("/api/quiz", quizRoutes);     // This exports only router

// Example fallback route or root endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
