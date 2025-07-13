import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const WeeklyProgressChart = () => {
  const userId = localStorage.getItem("userId");
  const API_URL = process.env.REACT_APP_API_URL;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/quiz/weekly-progress/${userId}`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching weekly progress:", error);
      }
    };

    if (userId) fetchProgress();
  }, [userId]);

  if (data.length === 0) {
    return (
      <div className="bg-background-alt text-text-dark text-center p-4 rounded-lg shadow-md">
        No progress data yet.
      </div>
    );
  }

  const primaryCondition = data[0]?.condition;

  return (
    <div className="bg-background-alt p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-center text-primary mb-4 font-mullish">
        Weekly Progress for{" "}
        <span className="text-text-dark">{primaryCondition}</span>
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#CCE3DE" />
          <XAxis dataKey="date" stroke="#6B9080" />
          <YAxis stroke="#6B9080" allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderColor: "#CCE3DE",
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#6B9080"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#CCE3DE", strokeWidth: 2, fill: "#6B9080" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyProgressChart;
