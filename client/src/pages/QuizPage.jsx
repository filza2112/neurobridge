import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";

const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isOnMainQuizPage = location.pathname === "/features/quiz";

  const goHome = () =>
    isOnMainQuizPage ? navigate("/") : navigate("/features/quiz");
  const goDashboard = () => navigate("/dashboard");

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-background text-primary font-mullish px-4 py-6">
      
      {/* Show back to options only when inside a quiz route */}
      {/* {isSubRoute && ( */}
      {(
        <div className="mb-6 text-center">
          <button
            onClick={() => navigate("/features/quiz")}
            className="text-sm text-accent underline hover:text-primary"
          >
            ← Back to Quiz Options
          </button>
        </div>
      )}

      {/* Render nested quiz component if routed */}
      <Outlet />

      {isOnMainQuizPage && (
        <div className="flex flex-col items-center gap-6">
          <QuizCard
            title="🧠 First-Time Quiz"
            onClick={() => navigate("first")}
            description="Find your brain blend with ADHD/OCD/Autism patterns"
          />
          <QuizCard
            title="📆 Weekly Quiz"
            onClick={() => navigate("weekly")}
            description="Track your mood, behavior, and progress over time"
          />
          <QuizCard
            title="🎨 Mood Comic"
            onClick={() => navigate("comic")}
            description="Tap the panel that feels most like your day"
          />
        </div>
      )}
    </div>
    </>
  );
};

const QuizCard = ({ title, description, onClick }) => (
  <div
    onClick={onClick}
    className="w-80 bg-background-alt hover:bg-accent rounded-xl shadow-md p-6 text-center cursor-pointer transition"
  >
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-text-secondary text-sm">{description}</p>
  </div>
);

export default QuizPage;
