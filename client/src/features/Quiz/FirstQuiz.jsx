import React, { useState } from "react";
import firstQuizQuestions from "./quizdata/first"; // your questions array
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { useAuth } from "../../auth/AuthContext"; // modify if your auth context is elsewhere

ChartJS.register(ArcElement, Tooltip, Legend);

const scale = ["Never", "Sometimes", "Often", "Always"];

const FirstQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  // const { user } = useAuth(); // Ensure this returns user._id

  const handleSelect = (index) => {
    const updated = [...responses];
    updated[currentQuestion] = index;
    setResponses(updated);
  };

  const handleNext = () => {
    if (responses[currentQuestion] === undefined)
      return alert("Please select an option.");

    if (currentQuestion < firstQuizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const formattedResponses = firstQuizQuestions.map((q, i) => ({
      questionId: q.id,
      selectedOptionIndex: responses[i] || 0,
    }));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/quiz/submit-quiz`,
        {
          // userId: user._id,
          type: "first",
          responses: formattedResponses,
        }
      );

      setResult(res.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Quiz submission failed:", error);
      alert("Something went wrong. Try again.");
    }
  };

  if (submitted && result) {
    const pieData = {
      labels: Object.keys(result.scores),
      datasets: [
        {
          label: "Neurotype Distribution",
          data: Object.values(result.scores),
          backgroundColor: ["#60A5FA", "#F87171", "#FBBF24"],
        },
      ],
    };

    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Brain Blend</h2>
        <div className="w-64 mx-auto mb-6">
          <Pie data={pieData} />
        </div>
        <p className="text-lg">
          You may experience patterns related to{" "}
          <strong>{result.primaryCondition}</strong>. We'll personalize your
          tools accordingly.
        </p>
      </div>
    );
  }

  const question = firstQuizQuestions[currentQuestion];

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold mb-2 text-blue-700">
        Question {currentQuestion + 1} of {firstQuizQuestions.length}
      </h2>
      <p className="mb-6 text-gray-800 font-medium">{question.question}</p>

      <div className="flex flex-col gap-2">
        {scale.map((label, index) => (
          <label
            key={index}
            className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 p-2 rounded transition"
          >
            <input
              type="radio"
              name={`q-${currentQuestion}`}
              checked={responses[currentQuestion] === index}
              onChange={() => handleSelect(index)}
              className="accent-blue-600"
            />
            {label}
          </label>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {currentQuestion === firstQuizQuestions.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default FirstQuiz;
