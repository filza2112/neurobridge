import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = () => navigate("/");
  const goDashboard = () => navigate("/dashboard");

  const isSubRoute = location.pathname !== "/features/quiz";

  return (
    <div className="min-h-screen bg-background text-primary font-mullish px-4 py-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10 border-b border-accent pb-4">
        <button onClick={goHome} className="text-xl hover:text-accent">
          🏠 Home
        </button>
        <h1 className="text-3xl font-bold text-center">Quiz Page</h1>
        <button onClick={goDashboard} className="text-xl hover:text-accent">
          📊 Dashboard
        </button>
      </div>

      {/* Show back to options only when inside a quiz route */}
      {isSubRoute && (
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

      {/* Render main menu if on /features/quiz */}
      {!isSubRoute && (
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
