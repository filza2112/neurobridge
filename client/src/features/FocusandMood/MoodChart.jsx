import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function MoodChart() {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/mood/all") // You need to build this route too
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((entry) => ({
          time: new Date(entry.timestamp).toLocaleTimeString(),
          mood: entry.moodValue,
        }));
        setMoodData(formatted);
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h3 className="text-lg font-semibold mb-2">📊 Mood Levels Over Time</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={moodData}>
          <XAxis dataKey="time" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line type="monotone" dataKey="mood" stroke="#CCE3DE" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodChart;
