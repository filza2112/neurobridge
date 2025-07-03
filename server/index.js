const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const focusRoutes = require("./routes/focus");
const moodRoutes = require("./routes/mood"); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/focus", focusRoutes);
app.use("/api/mood", moodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;