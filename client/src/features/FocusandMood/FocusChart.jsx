import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const api = process.env.REACT_APP_API_URL;
function FocusChart() {
  const userId = localStorage.getItem("userId");
  const [focusData, setFocusData] = useState([]);
  const [summary, setSummary] = useState({
    totalFocusedMinutes: 0,
    totalDistractedMinutes: 0,
    focusBreaks: 0,
    avgTimeBetweenBreaks: 0,
  });

  useEffect(() => {
    fetch(`${api}/api/focus/all/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const entries = data.focusLogs;

        const formatted = entries.map((entry) => ({
          timestamp: new Date(entry.timestamp),
          time: new Date(entry.timestamp).toLocaleTimeString(),
          focus: entry.visible ? 1 : 0,
        }));

        setFocusData(formatted);

        // Summary calculations
        let totalFocused = 0;
        let totalDistracted = 0;
        let breaks = 0;
        let lastTimestamp = null;
        let breakIntervals = [];

        for (let i = 0; i < formatted.length; i++) {
          const curr = formatted[i];
          const next = formatted[i + 1];

          if (i > 0 && formatted[i - 1].focus === 1 && curr.focus === 0) {
            breaks++;
            if (lastTimestamp) {
              const diff =
                (curr.timestamp.getTime() - lastTimestamp.getTime()) / 1000;
              breakIntervals.push(diff);
            }
          }

          if (next) {
            const diffSeconds =
              (next.timestamp.getTime() - curr.timestamp.getTime()) / 1000;

            if (curr.focus === 1) totalFocused += diffSeconds;
            else totalDistracted += diffSeconds;
          }

          lastTimestamp = curr.timestamp;
        }

        const avgBreak =
          breakIntervals.length > 0
            ? (breakIntervals.reduce((a, b) => a + b, 0) /
                breakIntervals.length /
                60).toFixed(2)
            : 0;

        setSummary({
          totalFocusedMinutes: (totalFocused / 60).toFixed(2),
          totalDistractedMinutes: (totalDistracted / 60).toFixed(2),
          focusBreaks: breaks,
          avgTimeBetweenBreaks: avgBreak,
        });
      });
  }, [userId]);

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Focus Visibility Over Time</h3>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={focusData}>
          <XAxis dataKey="time" tick={{ fontSize: 10 }} 
  interval="preserveStartEnd" />
          <YAxis domain={[0, 1]} ticks={[0, 1]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="focus"
            stroke="#6B9080"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 text-sm text-secondary space-y-2">
        <div>
          <span className="font-bold">Total Focused Time:</span>{" "}
          {summary.totalFocusedMinutes} minutes
        </div>
        <div>
          <span className="font-bold">Total Distracted Time:</span>{" "}
          {summary.totalDistractedMinutes} minutes
        </div>
        <div>
          <span className="font-bold">Number of Focus Breaks:</span>{" "}
          {summary.focusBreaks}
        </div>
        <div>
          <span className="font-bold">Average Time Between Breaks:</span>{" "}
          {summary.avgTimeBetweenBreaks} minutes
        </div>
      </div>
    </div>
  );
}

export default FocusChart;