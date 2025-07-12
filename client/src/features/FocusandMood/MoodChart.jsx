import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MoodChart() {
  const [moodData, setMoodData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5000/api/mood/all/userId=${userId}`)

      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((entry) => ({
          time: new Date(entry.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          mood: entry.mood, // fixed this line!
        }));
        setMoodData(formatted);
      })
      .catch((err) => {
        console.error("Failed to load mood data", err);
      });
  }, [userId]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-2">Mood Levels Over Time</h3>
      <ResponsiveContainer width="100%" height={255}>
        <LineChart data={moodData}>
          <XAxis dataKey="time" tick={{ fontSize: 10 }} 
  interval="preserveStartEnd" />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} 
  interval="preserveStartEnd"  />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#6B9080"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodChart;