import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import RoutineBuilderPage from './pages/Routine';
import FocusMoodTrackerPage from './pages/Focus';
import QuizPage from './pages/Quiz';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/features/routine-builder" element={<RoutineBuilderPage />} />
        <Route path="/features/focus-mood-tracker" element={<FocusMoodTrackerPage />} />
        <Route path="/features/quiz" element={<QuizPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}