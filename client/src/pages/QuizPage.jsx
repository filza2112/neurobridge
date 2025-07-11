import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isOnMainQuizPage = location.pathname === "/features/quiz";

  const goHome = () =>
    isOnMainQuizPage ? navigate("/") : navigate("/features/quiz");
  const goDashboard = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-background text-primary font-mullish px-4 py-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10 border-b border-accent pb-4">
        <button onClick={goHome} className="text-xl hover:text-accent">
          {isOnMainQuizPage ? "Home" : "Quiz Home"}
        </button>
        <h1 className="text-3xl font-bold text-center">Quiz Page</h1>
        <button onClick={goDashboard} className="text-xl hover:text-accent">
          Dashboard
        </button>
      </div>

      {/* Nested quiz component or main menu */}
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
