import React, { useState, useEffect } from "react";

export default function DigitSpanTest({ userId, difficulty }) {
  const [digitSequence, setDigitSequence] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showDigits, setShowDigits] = useState(true);
  const [message, setMessage] = useState("");
  const [startTime, setStartTime] = useState(null);

  const getSpanLength = () => {
    switch (difficulty) {
      case "easy": return 3;
      case "medium": return 5;
      case "hard": return 7;
      default: return 5;
    }
  };

  const generateSequence = () => {
    const length = getSpanLength();
    const sequence = Array.from({ length }, () =>
      Math.floor(Math.random() * 10)
    );
    setDigitSequence(sequence);
    setShowDigits(true);
    setMessage("");
    setStartTime(Date.now());

    setTimeout(() => {
      setShowDigits(false);
    }, 1000 * length); // 1s per digit
  };

  useEffect(() => {
    generateSequence();
  }, [difficulty]);

  const handleSubmit = () => {
    const endTime = Date.now();
    const inputArray = userInput.split("").map(Number);
    const isCorrect =
      inputArray.length === digitSequence.length &&
      inputArray.every((digit, i) => digit === digitSequence[i]);

    setMessage(isCorrect ? "✅ Correct!" : "❌ Incorrect");

    // Save to MongoDB
    fetch(`http://localhost:5000/api/attention/digit-span/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        sequence: digitSequence,
        userInput: inputArray,
        correct: isCorrect,
        timeTaken: endTime - startTime,
        difficulty,
        timestamp: new Date(),
        level: digitSequence.length, // <-- Add this line
      }),
    });

    setTimeout(() => {
      setUserInput("");
      generateSequence();
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full text-center">
      <h2 className="text-2xl font-bold text-primary mb-4">🔢 Digit Span Test</h2>

      {showDigits ? (
        <div className="text-3xl tracking-widest font-bold text-primary mb-4">
          {digitSequence.join(" ")}
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter the digits"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="p-2 border border-accent rounded-md w-2/3 text-center mb-4"
          />
          <div>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Submit
            </button>
          </div>
          {message && (
            <p className="mt-4 font-medium text-text-secondary">{message}</p>
          )}
        </>
      )}
    </div>
  );
}
