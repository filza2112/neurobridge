import React, { useState } from "react";
const api = process.env.REACT_APP_API_URL;


function AddTaskModal({ onClose, setTasks }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(30);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const addTask = async () => {
    if (!title.trim()) return;
    setLoading(true);

    const task = {
      userId,
      title,
      estimatedTime: time,
      type: "personal",
      date: new Date().toISOString().slice(0, 10),
    };

    try {
      await fetch(`${api}/api/tasks/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      // 🔁 Fetch the full updated task list
      const allRes = await fetch(`${api}/api/tasks/all/${userId}`);
      const updatedTasks = await allRes.json();
      setTasks(updatedTasks);
      onClose(); // ✅ Automatically close modal after adding
    } catch (err) {
      console.error("Failed to add task", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md transition-all">
        <h2 className="text-xl font-bold mb-4 text-gray-800">➕ Add Personal Task</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Task title"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Estimated time (min)"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-primary rounded hover:bg-secondary text-white"
          >
            Cancel
          </button>
          <button
            onClick={addTask}
            disabled={loading}
            className="px-4 py-2 text-sm text-white bg-primary rounded hover:bg-secondary"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
