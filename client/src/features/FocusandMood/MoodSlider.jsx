import React, { useState } from "react";

function MoodSlider() {
  const [mood, setMood] = useState(50);
  const [why, setWhy] = useState("");

  const submitMood = () => {
    const moodEntry = {
      timestamp: new Date().toISOString(),
      mood,
      why,
    };
    console.log("Mood entry:", moodEntry);
    // send to DB
  };

  return (
    <div className="bg-background-alt p-4 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-2">How are you feeling?</h2>
      <input
        type="range"
        min="0"
        max="100"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full accent-primary"
      />
      <div className="mt-2">Mood: {mood}</div>
      <textarea
        placeholder="Why? (optional)"
        className="w-full mt-2 p-2 border border-primary rounded-md"
        value={why}
        onChange={(e) => setWhy(e.target.value)}
      ></textarea>
      <button
        onClick={submitMood}
        className="mt-3 px-4 py-2 bg-primary text-white rounded-xl"
      >
        Submit
      </button>
    </div>
  );
}

export default MoodSlider;