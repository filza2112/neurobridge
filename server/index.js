const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require('./routes/auth');
const focusRoutes = require("./routes/focus");
const moodRoutes = require("./routes/mood"); 
const routineRoutes = require("./routes/routine");
const quizRoutes = require("./routes/quiz"); 
const authMiddleware = require("./Middlewares/auth");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use('/auth', authRoutes);
app.use("/api/focus", focusRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/tasks", routineRoutes);
app.use("/api/quiz", quizRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;