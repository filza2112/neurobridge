import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const FirstQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Replace with your real auth logic
  const userId = localStorage.getItem("userId") || "dev_user_123";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/quiz/quiz-questions`
        );
        console.log("Fetched questions:", res.data); // 👈 add this
        const filtered = res.data.filter((q) => q.type === "first");
        setQuestions(filtered);
      } catch (err) {
        console.error("Error fetching quiz questions:", err);
      }
    };
    fetchQuestions();
  }, []);
  

  const likertOptions = ["Never", "Sometimes", "Often", "Always"];

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
      const res = await axios.post(`${API_URL}/api/quiz/submit-quiz`,
        {
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

  if (!userId) {
    return (
      <div className="text-center p-4">Please log in to take the quiz.</div>
    );
  }

  if (submitted && result) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Neurotype Blend</h2>
        <div className="space-y-2">
          {Object.entries(result.scores).map(([trait, score]) => (
            <div
              key={trait}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{trait}</span>
              <span>{score}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-lg">
          You may experience patterns related to:{" "}
          <strong>{result.primaryCondition}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">First-Time Neurotype Quiz</h2>
      {questions.length === 0 ? (
        <p>Loading questions.</p>
      ) : (
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="border rounded p-4 shadow-sm">
              <p className="font-medium mb-2">{q.question}</p>
              <div className="flex flex-wrap gap-2">
                {likertOptions.map((opt, index) => (
                  <label key={index} className="cursor-pointer">
                    <input
                      type="radio"
                      name={q.id}
                      value={index}
                      checked={responses[q.id] === index}
                      onChange={() => handleChange(q.id, index)}
                      className="mr-1"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Quiz"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FirstQuiz;
