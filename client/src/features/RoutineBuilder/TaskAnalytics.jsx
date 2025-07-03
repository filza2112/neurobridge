// client/src/features/RoutineBuilder/TaskAnalytics.jsx

import React from "react";

function TaskAnalytics({ completed, total }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getMessage = () => {
    if (percent === 100) return "🎯 Perfect streak! Keep it up!";
    if (percent >= 75) return "🔥 You're doing great!";
    if (percent >= 50) return "💪 Halfway there!";
    if (percent > 0) return "👍 Let's aim higher!";
    return "🕒 Ready to get started?";
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg text-primary">Task Completion</h3>
        <span className="text-sm text-gray-500">{completed}/{total} tasks</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <div className="text-sm text-gray-700 text-center">{getMessage()}</div>
    </div>
  );
}

export default TaskAnalytics;
