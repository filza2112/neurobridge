import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const FirstQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alreadyTaken, setAlreadyTaken] = useState(false);

  const userId = localStorage.getItem("userId") || "dev_user_123";
  
  useEffect(() => {
    const init = async () => {
      try {
        const check = await axios.get(`${API_URL}/api/quiz/has-taken-first`, {
          params: { userId },
        });

        if (check.data.hasTaken) {
          setAlreadyTaken(true);
        } else {
          const res = await axios.get(`${API_URL}/api/quiz/quiz-questions`);
          const filtered = res.data.filter((q) => q.type === "first");
          setQuestions(filtered);
        }
      } catch (err) {
        console.error("Error initializing quiz:", err);
      }
    };
    init();
  }, []);

  const handleChange = (questionId, index) => {
    setResponses((prev) => ({ ...prev, [questionId]: index }));
  };

  const handleSubmit = async () => {
    const formattedResponses = Object.entries(responses).map(
      ([questionId, selectedOptionIndex]) => ({
        questionId,
        selectedOptionIndex,
      })
    );

    if (formattedResponses.length !== questions.length) {
      alert("Please answer all questions.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/quiz/submit-first-quiz`, {
        userId,
        type: "first",
        responses: formattedResponses,
      });

      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      await axios.delete(`${API_URL}/api/quiz/reset-progress`, {
        params: { userId },
      });
      window.location.reload();
    } catch (err) {
      alert("Failed to reset progress.");
    }
  };

  if (!userId) {
    return (
      <div className="text-center p-4 text-text-dark">
        Please log in to take the quiz.
      </div>
    );
  }

  if (alreadyTaken && !submitted) {
    return (
      <div className="p-6 text-center max-w-2xl mx-auto space-y-4 text-text-dark">
        <h2 className="text-xl font-semibold">
          You've already taken the first quiz.
        </h2>
        <p>Do you want to reset your progress and retake the quiz?</p>
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Yes, Reset My Progress
        </button>
      </div>
    );
  }
  if (submitted && result) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-text-dark">
          Your Neurotype Blend
        </h2>
        <div className="space-y-2">
          {Object.entries(result.scores).map(([trait, score]) => (
            <div
              key={trait}
              className="flex justify-between items-center border-b py-2 text-text-dark"
            >
              <span>{trait}</span>
              <span>{score}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-lg text-text-dark">{result.displayResult}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-text-dark">
        First-Time Neurotype Quiz
      </h2>

      {questions.length === 0 ? (
        <p className="text-text-dark">Loading questions.</p>
      ) : (
        <div className="space-y-6">
          <div
            key={questions[currentIndex].id}
            className="border rounded p-4 shadow-sm"
          >
            <p className="font-medium mb-2 text-text-dark">
              {questions[currentIndex].question}
            </p>
            <div className="flex flex-wrap gap-2">
              {questions[currentIndex].options.map((opt, index) => (
                <label
                  key={index}
                  className="cursor-pointer text-text-dark flex items-center gap-1"
                >
                  <input
                    type="radio"
                    name={questions[currentIndex].id}
                    value={index}
                    checked={responses[questions[currentIndex].id] === index}
                    onChange={() =>
                      handleChange(questions[currentIndex].id, index)
                    }
                    className="accent-primary"
                  />
                  {opt.text}
                </label>
              ))}
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 my-4">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <div className="flex justify-end items-center gap-4 mt-4">
            {currentIndex > 0 && (
              <button
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="text-text-dark hover:underline"
              >
                Back
              </button>
            )}

            <button
              onClick={() => {
                if (responses[questions[currentIndex].id] === undefined) {
                  alert("Please answer the question.");
                  return;
                }

                if (currentIndex < questions.length - 1) {
                  setCurrentIndex((prev) => prev + 1);
                } else {
                  handleSubmit();
                }
              }}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {currentIndex === questions.length - 1
                ? loading
                  ? "Submitting..."
                  : "Submit Quiz"
                : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstQuiz;
