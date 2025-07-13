import React, { useState, useEffect } from "react";
const api = process.env.REACT_APP_API_URL;

const colors = ["red", "green", "blue", "white"];

export default function StroopTest({ userId, difficulty }) {
  const [word, setWord] = useState("");
  const [color, setColor] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [status, setStatus] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [count, setCount] = useState(0);
  const [finalStats, setFinalStats] = useState(null); // new state

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
    const timeTaken = endTime - startTime;
    const correct = selectedColor === color;

    const attempt = {
      word,
      color,
      selectedColor,
      correct,
      timeTaken,
      timestamp: new Date(),
    };

    const newAttempts = [...attempts, attempt];
    setAttempts(newAttempts);
    setCount((prev) => prev + 1);
    setStatus(correct ? "✅ Correct" : "❌ Incorrect");

    if (newAttempts.length === 10) {
      // Send 10 attempts as a batch
      fetch(`${api}/api/attention/stroop/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          attempts: newAttempts,
          difficulty,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Saved:", data);
          setFinalStats({
            accuracy: data.accuracy?.toFixed(1),
            avgTime: data.avgTime?.toFixed(0),
          });
        })
        .catch((err) => console.error("Error sending Stroop results:", err));

      setAttempts([]);
      setCount(0);
    }

    setTimeout(() => {
      setStatus("");
      generateWord();
    }, 800);
  };

  return (
    <div className="text-center mt-6">
      <p className="text-lg mb-4">
        Click the <strong>color</strong> the word is written in
      </p>

      <div className="text-5xl font-bold mb-4" style={{ color }}>
        {word}
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => handleAnswer(c)}
            className={`px-4 py-2 rounded-md border text-white bg-${c}-500`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-text-secondary">{status}</p>
      <p className="text-sm text-gray-500">Attempt {count + 1}/10</p>

      {finalStats && (
        <div className="mt-4 text-md text-green-700">
          🎯 <strong>Accuracy:</strong> {finalStats.accuracy}% <br />⏱{" "}
          <strong>Avg Time:</strong> {finalStats.avgTime} ms
        </div>
      )}
    </div>
  );
}
