import React, { useEffect, useState } from "react";
import TaskList from "../features/RoutineBuilder/TaskList";
import AddTaskModal from "../features/RoutineBuilder/AddTaskModel";
import TaskAnalytics from "../features/RoutineBuilder/TaskAnalytics";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const userId = "demo-user";

function RoutineBuilder() {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [completionStats, setCompletionStats] = useState({ completed: 0, total: 0 });

  // Fetch tasks (smart + personal)
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks/all?userId=demo-user")
      .then((res) => res.json())
      .then((fetchedTasks) => {
        reorderTasks(fetchedTasks);
      });
  }, []);

  // Smart reordering based on mood/focus weights
  const reorderTasks = (taskArray) => {
    const sorted = [...taskArray].sort((a, b) => {
      const weightA = (a.moodLevel ?? 50) * 0.6 + (a.focusLevel ?? 50) * 0.4;
      const weightB = (b.moodLevel ?? 50) * 0.6 + (b.focusLevel ?? 50) * 0.4;
      return weightA - weightB;
    });
    setTasks(sorted);
    updateCompletionStats(sorted);
  };

  const updateCompletionStats = (taskList) => {
    const total = taskList.length;
    const completed = taskList.filter((t) => t.completed).length;
    setCompletionStats({ completed, total });
  };

  // Smart Task Generation
  const handleSmartGenerate = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks/smart-generate?userId=demo-user");

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Backend error:", errorData);
        alert(errorData.error || "Failed to generate tasks");
        return;
      }

      const data = await res.json();
      console.log("Generated tasks:", data);

      if (!Array.isArray(data)) {
        console.error("Expected an array but got:", data);
        alert(data.error || "Invalid response format from AI");
        return;
      }

      if (data.length === 0) {
        alert("No tasks were generated. Try adjusting quiz answers or mood.");
        return;
      }

      // Update state or reorder task list
      reorderTasks(data);

      // Optional: show confirmation
      alert("Smart routine generated successfully!");
    } catch (err) {
      console.error("Network or parsing error:", err);
      alert("Could not connect to the task generator. Please check your server or internet.");
    }
  };



  const handleTaskUpdate = (updatedTasks) => {
    setTasks(updatedTasks);
    updateCompletionStats(updatedTasks);
  };

  return (
    <div className="p-6 font-mullish min-h-screen bg-background">
      <Navbar />
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
      <Footer />
    </div>

  );
}

export default RoutineBuilder;
