import React, { useEffect, useState } from "react";
import TaskList from "../features/RoutineBuilder/TaskList";
import AddTaskModal from "../features/RoutineBuilder/AddTaskModel";
import TaskAnalytics from "../features/RoutineBuilder/TaskAnalytics";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const userId = localStorage.getItem("userId") || "dev_user_123";
function RoutineBuilder({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [completionStats, setCompletionStats] = useState({ completed: 0, total: 0 });

  // Fetch tasks (smart + personal)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/tasks/all/userId=${userId}`);
        const data = await res.json();
        if (Array.isArray(data)) setTasks(data);
        else console.error("Invalid task format:", data);
      } catch (err) {
        console.error("Failed to load tasks:", err);
      }
    };
    fetchTasks();
  }, [userId]);


  

  const updateCompletionStats = (taskList) => {
    const total = taskList.length;
    const completed = taskList.filter((t) => t.completed).length;
    setCompletionStats({ completed, total });
  };

  // Smart Task Generation
  const handleSmartGenerate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/smart-generate/userId=${userId}`);

      const data = await res.json(); // ✅ only call .json() ONCE

      if (!res.ok) {
        console.error("Backend error:", data);
        alert(data.error || "Failed to generate tasks");
        return;
      }

      if (!Array.isArray(data)) {
        console.error("Expected an array but got:", data);
        alert(data.error || "Invalid response format");
        return;
      }

      // ✅ Merge new tasks with existing, avoiding duplicates
      setTasks((prevTasks) => {
        const existingIds = new Set(prevTasks.map((t) => t._id));
        const merged = [...prevTasks];
        data.forEach((task) => {
          if (!existingIds.has(task._id)) merged.push(task);
        });
        return merged;
      });

    } catch (err) {
      console.error("Network or parsing error:", err);
      alert("Could not connect to task generator.");
    }
  };

  const handleTaskUpdate = (updatedTasks) => {
    setTasks(updatedTasks);
    updateCompletionStats(updatedTasks);
  };

  return (
    <>
    <Navbar />
    <div className="p-6 font-mullish min-h-screen bg-background">
      <h1 className="text-3xl font-bold mt-4 mb-6 text-primary text-center">🗓 Daily Routine Builder</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <button onClick={handleSmartGenerate} className="btn-primary">✨ Generate Smart Tasks</button>
        <button onClick={() => setShowAddModal(true)} className="btn-secondary">➕ Add Personal Task</button>
      </div>

      <TaskList tasks={tasks} setTasks={handleTaskUpdate} />

      {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} setTasks={handleTaskUpdate} />}

      <div className="mt-6">
        <TaskAnalytics completed={completionStats.completed} total={completionStats.total} />
      </div>

      <div className="mt-8 text-text-secondary text-sm text-center">
        💡 Missed a task? Try a lighter fallback. You can always regenerate tasks if your mood or focus changes.
      </div>
    </div>
    <Footer />
  </>

  );
}

export default RoutineBuilder;
