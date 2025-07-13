import { useState } from "react";
import { FaMobileAlt, FaVolumeUp, FaBrain, FaUserFriends, FaBed } from "react-icons/fa";
const api = process.env.REACT_APP_API_URL;

const DISTRACTIONS = [
  { type: "Phone", icon: <FaMobileAlt />, color: "bg-red-200" },
  { type: "Noise", icon: <FaVolumeUp />, color: "bg-yellow-200" },
  { type: "Thoughts", icon: <FaBrain />, color: "bg-blue-200" },
  { type: "People", icon: <FaUserFriends />, color: "bg-green-200" },
  { type: "Fatigue", icon: <FaBed />, color: "bg-purple-200" },
];

export default function DistractionLogger() {
  const userId = localStorage.getItem("userId");
  const [selected, setSelected] = useState("");


  
  const handleLog = (type) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("❌ userId is missing in localStorage");
      alert("User ID is missing. Please log in again.");
      return;
    }

    fetch(`${api}/api/distraction/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, type })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Logged distraction:", data);
        setSelected(type);  // This will display "Logged: ..." on UI
      })
      .catch((err) => {
        console.error("Error logging distraction:", err);
      });
  };



  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md min-h-[500px] border border-accent">  <h2 className="text-xl font-semibold text-gray-800 mb-4">🚫 Log a Distraction</h2>
      <div className="grid grid-cols-2 gap-4">
        {DISTRACTIONS.map((d, i) => (
          <button
            key={i}
            onClick={() => handleLog(d.type)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition duration-200 transform hover:scale-105 ${d.color} hover:shadow-lg`}
            title={d.type}
          >
            <span className="text-2xl">{d.icon}</span>
            <span className="text-sm mt-1 font-medium">{d.type}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-4 text-center text-primary font-semibold">
          Logged: {selected}
        </div>
      )}
    </div>
  );
}
