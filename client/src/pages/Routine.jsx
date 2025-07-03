import React, { useEffect, useState } from "react";
import TaskList from "../features/RoutineBuilder/TaskList";
import AddTaskModal from "../features/RoutineBuilder/AddTaskModel";
import TaskAnalytics from "../features/RoutineBuilder/TaskAnalytics";

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
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("Expected an array but got:", data);
        alert(data.error || "Failed to generate tasks");
        return;
      }

      reorderTasks(data); // only if it's a valid array
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
    <div className="p-6 font-mullish min-h-screen bg-background">
      <h1 className="text-3xl font-bold mb-6 text-primary">🗓 Daily Routine Builder</h1>

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
  );
}

export default RoutineBuilder;
