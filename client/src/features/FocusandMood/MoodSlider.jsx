import React, { useState } from "react";

const emojis = ["😡", "😟", "😐", "🙂", "😄"];

function MoodSlider() {
  const [moodIndex, setMoodIndex] = useState(2); // Default to "Neutral"
  const [why, setWhy] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitMood = async () => {
    setLoading(true);

    const moodEntry = {
      userId: "demo-user", // Replace with dynamic user ID if available
      timestamp: new Date().toISOString(),
      mood: moodIndex * 25, // Mood on scale 0–100
      emoji: emojis[moodIndex],
      why,
    };

    try {
      const res = await fetch("http://localhost:5000/api/mood/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moodEntry),
      });

      await res.json();
      setSubmitted(true);
      setWhy(""); // Clear reason input
      setTimeout(() => setSubmitted(false), 3000); // Hide message after 3s
    } catch (error) {
      console.error("Error saving mood:", error);
      alert("Failed to submit mood.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">How are you feeling?</h2>

      {/* Selected Emoji + Label */}
      <div className="text-center text-4xl">{emojis[moodIndex]}</div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="4"
        step="1"
        value={moodIndex}
        onChange={(e) => setMoodIndex(parseInt(e.target.value))}
        className="w-full accent-primary"
      />

      {/* Emoji row */}
      <div className="flex justify-between text-xl px-1 mt-3 mb-1 text-primary">
        {emojis.map((emoji, index) => (
          <span
            key={index}
            className={`transition-transform duration-200 ${
              index === moodIndex ? "scale-125" : "opacity-40"
            }`}
          >
            {emoji}
          </span>
        ))}
      </div>

      

      {/* Reason text area */}
      <textarea
        placeholder="Why? (optional)"
        className="w-full mt-4 p-2 border border-primary rounded-md"
        value={why}
        onChange={(e) => setWhy(e.target.value)}
      ></textarea>

      {/* Submit Button or Feedback */}
      {submitted && (
        <div className="text-primary text-center mt-3">Thanks for sharing your mood!</div>
      )}
      {loading ? (
        <div className="text-center text-primary mt-3">Submitting...</div>
      ) : (
        <button
          onClick={submitMood}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-xl w-full"
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default MoodSlider;
