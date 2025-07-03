import React from "react";

function MoodDiary() {
  // placeholder data
  const timeline = [
    { time: "8 AM", mood: "🙂" },
    { time: "12 PM", mood: "😐" },
    { time: "6 PM", mood: "😄" },
  ];

  return (
    <div className="bg-background-alt p-4 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Mood Timeline</h2>
      <div className="flex gap-4 items-center justify-between">
        {timeline.map(({ time, mood }, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-2xl">{mood}</span>
            <span className="text-sm text-text-secondary">{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodDiary;