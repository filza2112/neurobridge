import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const userId = localStorage.getItem("userId") || "dev_user_123";
function TaskAnalytics({ completed, total }) {
  const [completionData, setCompletionData] = useState([]);
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(`${currentYear}-01-01`);
  const endOfYear = new Date(`${currentYear}-12-31`);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tasks/completion-history/userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((d) => ({
          date: d.date,
          count: parseInt(d.percent),
        }));
        setCompletionData(formatted);
      });
  }, []);

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
        <span className="text-sm text-gray-500">
          {completed}/{total} tasks
        </span>
      </div>

      <div className="w-full bg-secondary rounded-full h-3 mb-2">
        <div
          className="bg-primary h-3 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <div className="text-sm text-gray-700 text-center mb-4">{getMessage()}</div>

      <h4 className="font-medium mb-2 text-gray-700">Yearly Completion Streak</h4>
      <CalendarHeatmap
        startDate={startOfYear}
        endDate={endOfYear}
        values={completionData}
        showWeekdayLabels={false}
        classForValue={(value) => {
          if (!value) return "color-empty";
          if (value.count >= 100) return "color-github-4";
          if (value.count >= 75) return "color-github-3";
          if (value.count >= 50) return "color-github-2";
          return "color-github-1";
        }}
        tooltipDataAttrs={(value) => ({
          "data-tip": value.date
            ? `${value.date}: ${value.count}% completed`
            : "No data",
        })}
      />
    </div>
  );
}

export default TaskAnalytics;
