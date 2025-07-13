const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

const focusModule = require("./routes/focus");
const moodModule = require("./routes/mood");
const pomodoroRoutes = require("./routes/pomodoro");
const distractionRoutes = require("./routes/distraction");
const attentionRoutes = require("./routes/attention");

const chatRoutes = require("./routes/chatRouts");
const alertRoutes = require("./routes/alert");
const audioRoutes = require("./routes/audio");

const authRoutes = require('./routes/auth');
const { router: focusRoutes } = require("./routes/focus");
const {router:moodRoutes} = require("./routes/mood");

const routineRoutes = require("./routes/routine");
const quizRoutes = require("./routes/quiz");


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
app.use("/api/tasks", routineRoutes); 
app.use("/api/pomodoro", pomodoroRoutes);
app.use("/api/distraction", distractionRoutes);
app.use("/api/attention", attentionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/alert", alertRoutes);
app.use("/api/audio", audioRoutes);

// Example fallback route or root endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/focus", focusRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/tasks", routineRoutes);
app.use("/api/quiz", quizRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
