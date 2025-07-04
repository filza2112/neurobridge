import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const WeeklyQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [primaryCondition, setPrimaryCondition] = useState(null);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId") || "dev_user_123";

  useEffect(() => {
    const fetchWeeklyQuestions = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/quiz/weekly-questions/${userId}`
        );
        setQuestions(res.data.questions);
        setPrimaryCondition(res.data.primaryCondition);
      } catch (err) {
        console.error("Error fetching weekly questions:", err);
      }
    };
    fetchWeeklyQuestions();
  }, [userId]);

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
      const res = await axios.post(`${API_URL}/api/quiz/submit-quiz`, {
        userId,
        type: "weekly",
        responses: formattedResponses,
      });

      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting weekly quiz:", err);
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
        <h2 className="text-2xl font-bold mb-4">Weekly Results</h2>
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
          Your current patterns are most aligned with:{" "}
          <strong>{result.primaryCondition}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Weekly Check-in</h2>
      {primaryCondition && (
        <p className="text-gray-600 mb-4">
          Focus: <strong>{primaryCondition}</strong>
        </p>
      )}
      {questions.length === 0 ? (
        <p>Loading weekly questions...</p>
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
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Weekly Check-in"}
          </button>
        </div>
      )}
    </div>
  );
};

export default WeeklyQuiz;
