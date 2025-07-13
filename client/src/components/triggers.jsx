import { useEffect, useState } from "react";

function TopTriggersCard() {
  const [triggers, setTriggers] = useState([]);
  const userId = localStorage.getItem("userId") || "devuser123";
  console.log(localStorage.getItem("userId"));

  useEffect(() => {
    async function fetchTriggers() {
      try {
        const res = await fetch(`http://localhost:5000/api/chat/top-triggers/${userId}`);
        const data = await res.json();
        setTriggers(data);
      } catch (err) {
        console.error("Error fetching top triggers", err);
      }
    }

    if (userId) fetchTriggers();
  }, [userId]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-lg font-semibold text-primary mb-4">Top Emotional Triggers</h2>
      {triggers.length === 0 ? (
        <p className="text-gray-500">No triggers found yet.</p>
      ) : (
        <ul className="space-y-2">
          {triggers.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span className="capitalize font-medium">{item.trigger}</span>
              <span className="text-sm text-gray-600">
                {item.count}x · Tone: <span className="italic">{item.tone}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopTriggersCard;
