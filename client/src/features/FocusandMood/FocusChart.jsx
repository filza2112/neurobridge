import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function FocusChart() {
  const [focusData, setFocusData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/focus/all?userId=demo-user")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.focusLogs.map((entry) => ({
          time: new Date(entry.timestamp).toLocaleTimeString("en-GB"), // HH:MM:SS
          focus: entry.visible ? 1 : 0,
        }));

        // Keep only the last 30 entries
        setFocusData(formatted.slice(-30));
      })
      .catch((error) => console.error("Error fetching focus data:", error));
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6 border border-gray-100">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        🔍 Focus Visibility Over Time
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={focusData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis
            domain={[0, 1]}
            tickFormatter={(val) => (val === 1 ? "Visible" : "Hidden")}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => (value === 1 ? "Visible" : "Hidden")}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="focus"
            stroke="#4CAF50"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "#4CAF50" }}
            name="Focus"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FocusChart;
