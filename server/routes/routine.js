// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// POST /api/tasks/add - Add personal task
router.post("/add", async (req, res) => {
  const { userId, title, estimatedTime = 15 } = req.body;

  if (!userId || !title) {
    return res.status(400).json({ error: "userId and title are required." });
  }

  const newTask = new Task({
    userId,
    title,
    date: new Date().toISOString().slice(0, 10),
    type: "personal",
    estimatedTime,
    completed: false,
    moodLevel: null,
    focusLevel: null,
  });

  try {
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Failed to add task." });
  }
});

// POST /api/tasks/update
router.post("/update", async (req, res) => {
  const { taskId, updates } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found." });
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Failed to delete task." });
  }
});


const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const {MoodLog} = require("./mood");
const {FocusLog} = require("./focus");
const QuizData = require("../models/Quiz");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get("/smart-generate", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId required" });

  try {
    // 1. Fetch mood, focus, quiz data
    const [moodLog, focusLog, quiz] = await Promise.all([
      MoodLog.findOne({ userId }).sort({ timestamp: -1 }),
      FocusLog.findOne({ userId }).sort({ timestamp: -1 }),
      QuizData.findOne({ userId }).sort({ createdAt: -1 }),
    ]);

    const mood = moodLog?.mood ?? 50;
    const focus = focusLog?.visible ? 1 : 0;

    if (!quiz) {
      
      return res.status(400).json({ error: "Quiz data not found." });
    }

    const prompt = `
You're a productivity and mental health assistant AI.

The user has submitted quiz responses indicating their behavior and cognition. Analyze these responses and infer whether the user shows tendencies toward Autism, ADHD, OCD, or other neurodivergent patterns.

Also consider:
- Mood level (scale 0–100): ${mood}
- Focus level (1 = focused, 0 = not focused): ${focus}

Based on the above, generate a helpful and adaptive daily routine for the user.

Only return a JSON array like this:
[
  { "title": "Take a short walk", "estimatedTime": 10 },
  { "title": "Stretch and hydrate", "estimatedTime": 5 }
]

Quiz Responses:
${JSON.stringify(quiz.answers || quiz)}
`;

    // 2. Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let tasks;
    try {
      tasks = JSON.parse(text);
    } catch (e) {
      console.error("Gemini returned invalid JSON:", text);
      return res.status(500).json({ error: "Gemini returned invalid task format." });
    }

    // 3. Save tasks to DB
    const date = new Date().toISOString().slice(0, 10);
    const savedTasks = await Task.insertMany(
      tasks.map((t) => ({
        ...t,
        userId,
        date,
        type: "smart",
        moodLevel: mood,
        focusLevel: focus,
      }))
    );

    res.json(savedTasks);
  } catch (err) {
    console.error("AI Routine Generation Error:", err);
    res.status(500).json({ error: "Failed to generate smart routine" });
  }
});


// GET /api/tasks/streak
router.get("/streak", async (req, res) => {
  const { userId } = req.query;
  const today = new Date().toISOString().slice(0, 10);
  const tasks = await Task.find({ userId }).sort({ date: -1 });

  let streak = 0;
  let current = new Date(today);

  const grouped = tasks.reduce((acc, t) => {
    acc[t.date] = acc[t.date] || [];
    acc[t.date].push(t);
    return acc;
  }, {});

  for (let [date, dayTasks] of Object.entries(grouped)) {
    const allComplete = dayTasks.every((t) => t.completed);
    if (allComplete) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else break;
  }

  res.json({ streak });
});

// GET /api/tasks/completion-history
router.get("/completion-history", async (req, res) => {
  const { userId } = req.query;

  const logs = await Task.find({ userId }).sort({ date: -1 });
  const history = {};

  logs.forEach((task) => {
    const date = task.date;
    if (!history[date]) history[date] = { completed: 0, total: 0 };
    history[date].total += 1;
    if (task.completed) history[date].completed += 1;
  });

  const result = Object.entries(history)
    .slice(-7)
    .map(([date, val]) => ({
      date,
      percent: ((val.completed / val.total) * 100).toFixed(0),
    }));

  res.json(result);
});

// GET /api/tasks/all - Get all tasks for a user
router.get("/all", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId is required in query." });
  }

  try {
    const tasks = await Task.find({ userId }).sort({ date: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
});


module.exports = router;
