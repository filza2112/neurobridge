import React, { useState, useEffect } from "react";

const colors = ["red", "green", "blue", "white"];

export default function StroopTest({ userId, difficulty }) {
  const [word, setWord] = useState("");
  const [color, setColor] = useState("");
  const [responseTime, setResponseTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    generateWord();
  }, []);

  const generateWord = () => {
    const word = colors[Math.floor(Math.random() * colors.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    setWord(word);
    setColor(color);
    setStartTime(Date.now());
  };

  const handleAnswer = (selectedColor) => {
    const endTime = Date.now();
    const correct = selectedColor === color;
    setStatus(correct ? " Correct" : " Incorrect");
    setResponseTime(endTime - startTime);

    // Save to MongoDB via API
    fetch("http://localhost:5000/api/attention/stroop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        word,
        color,
        selectedColor,
        correct,
        timeTaken: endTime - startTime,
        difficulty,
        timestamp: new Date()
      })
    });

    setTimeout(() => {
      setStatus("");
      generateWord();
    }, 1000);
  };

  return (
    <div className="text-center mt-6">
      <p className="text-lg mb-4">Click the **color** the word is written in</p>
      <div className="text-5xl font-bold mb-4" style={{ color }}>{word}</div>
      <div className="flex justify-center gap-4 mb-4">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => handleAnswer(c)}
            className={`px-4 py-2 rounded-md border text-gray-800 bg-${c}-500`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="text-text-secondary">{status}</p>
    </div>
  );
}
