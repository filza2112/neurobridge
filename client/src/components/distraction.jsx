import React, { useEffect, useState } from "react";

export default function TopDistractions({ userId }) {
  const [topDistractions, setTopDistractions] = useState([]);

  useEffect(() => {
    const fetchDistractions = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/distraction/summary/${userId}`
        );
        const data = await res.json();
        setTopDistractions(data);
      } catch (err) {
        console.error("Error fetching top distractions:", err);
      }
    };

    fetchDistractions();
  }, [userId]);

  const colorMap = {
    Phone: "bg-red-200",
    Noise: "bg-yellow-200",
    Thoughts: "bg-blue-200",
    People: "bg-green-200",
    Fatigue: "bg-purple-200",
  };

  const iconMap = {
    Phone: "📱",
    Noise: "🔊",
    Thoughts: "🧠",
    People: "👥",
    Fatigue: "🛌",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center mt-6">
      <h3 className="text-lg font-semibold text-red-600 mb-4">
        Top Distractions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {topDistractions.map((item) => (
          <div
            key={item._id}
            className={`p-4 rounded-lg shadow text-center ${
              colorMap[item._id] || "bg-gray-100"
            }`}
          >
            <div className="text-2xl mb-2">{iconMap[item._id] || "❓"}</div>
            <p className="font-semibold text-gray-700">{item._id}</p>
            <p className="text-sm text-gray-500">Logged {item.count} times</p>
          </div>
        ))}
      </div>
    </div>
  );
}
