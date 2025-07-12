import React, { useEffect, useState, useRef, useCallback } from "react";


function getRandomLetter() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
}

function CPTGame() {
  const [sequence, setSequence] = useState([]);
  const [currentLetter, setCurrentLetter] = useState("");
  const [status, setStatus] = useState("");
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [difficulty, setDifficulty] = useState("medium");
  const [timeLeft, setTimeLeft] = useState(null);
  const [flash, setFlash] = useState(false);

  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const resultRef = useRef([]);
  const userId = localStorage.getItem("userId") || "dev_user_123";
  const containerRef = useRef(null);
  let injectAXNext = useRef(false);

  const getSpeed = () => {
    if (difficulty === "easy") return 1000;
    if (difficulty === "medium") return 500;
    if (difficulty === "hard") return 300;
    return 500;
  };

  const startGame = () => {
    setSequence([]);
    setResults([]);
    resultRef.current = [];
    setSummary(null);
    setStatus("");
    setRunning(true);
    setTimeLeft(30);
    containerRef.current?.focus();
    injectAXNext.current = false;

    const speed = getSpeed();

    intervalRef.current = setInterval(() => {
      let letter;

      if (injectAXNext.current) {
        letter = "X";
        injectAXNext.current = false;
      } else {
        if (Math.random() < 0.25) {
          letter = "A";
          injectAXNext.current = true;
        } else {
          letter = getRandomLetter();
        }
      }

      setCurrentLetter(letter);
      setSequence((seq) => [...seq.slice(-4), letter]);
      setFlash(true);
      setTimeout(() => setFlash(false), speed * 0.8);
    }, speed);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          stopGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopGame = () => {
    clearInterval(intervalRef.current);
    clearInterval(timerRef.current);
    setRunning(false);
    setStatus("Test stopped");

    const total = resultRef.current.length;
    const correct = resultRef.current.filter((r) => r.isCorrect).length;
    const incorrect = total - correct;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    console.log("Total:", total, "Correct:", correct, "Incorrect:", incorrect, "Accuracy:", accuracy);

    const summaryData = { userId, total, correct, incorrect, accuracy, endedAt: new Date() };
    console.log("Summary data:", summaryData);
    setSummary(summaryData);
    console.log("Summary state updated");
    console.log("summary value is now:", summaryData);

    fetch("http://localhost:5000/api/focus/cpt-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(summaryData),
    });
  };

  const handleKeyPress = useCallback((e) => {
    console.log("KEY PRESSED:", e.key);

    if (e.key.toLowerCase() === "x" && running) {
      const match = sequence.slice(-2).join("") === "AX";
      const shownLetter = currentLetter;
      const responseTime = new Date();

      setStatus(match ? " Correct" : " Incorrect");

      const logEntry = {
        userId,
        shownLetter,
        responseTime,
        isCorrect: match,
        sequence,
      };

      resultRef.current.push(logEntry);
      console.log("Current results:", resultRef.current);


      fetch("http://localhost:5000/api/focus/cpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logEntry),
      });
    }
  }, [running, sequence, currentLetter, userId]);


  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="flex flex-col justify-center items-center min-h-screen bg-background p-6 rounded-xl shadow-lg max-w-xl w-full mx-auto"
      onKeyDown={handleKeyPress}
    >


      <h2 className="text-2xl font-semibold mb-4 text-primary">🧪 CPT Attention Test</h2>

      {running && (
        <div className="mb-4">
          <p className="text-text-secondary">⏱ Time Left: {timeLeft}s</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div
        className={`text-7xl font-bold text-primary h-24 mb-2 transition-transform duration-300 ${flash ? "scale-125" : "scale-100"
          }`}
      >
        {currentLetter}
      </div>
      <p className="text-text-secondary mb-4">Press "X" when you see an "X" after "A"</p>

      {!running && (
        <div className="mb-4">
          <label className="mr-2 text-primary font-medium">Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="p-2 rounded-md border border-primary"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      )}

      <div className="flex justify-center gap-4 mb-4">
        {!running ? (
          <button onClick={startGame} className="px-4 py-2 bg-primary text-white rounded-xl">
            ▶ Start
          </button>
        ) : (
          <button onClick={stopGame} className="px-4 py-2 bg-primary text-white rounded-xl">
            ⏹ Stop
          </button>
        )}
      </div>

      <div className="text-lg font-semibold text-primary mb-2">{status}</div>

      {summary && (
        <div className="mt-6 bg-background-alt p-4 rounded-xl shadow-lg text-left max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-2 text-primary">Test Summary</h3>
          <p className="text-text-secondary">Total Attempts: <span className="text-primary">{summary.total}</span></p>
          <p className="text-text-secondary">Correct Responses: <span className="text-primary">{summary.correct}</span></p>
          <p className="text-text-secondary">Incorrect Responses: <span className="text-primary">{summary.incorrect}</span></p>
          <p className="text-text-secondary font-bold">Accuracy: <span className="text-primary">{summary.accuracy}%</span></p>
        </div>
      )}
    </div>
  );
}

export default CPTGame;
