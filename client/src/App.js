import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import RoutineBuilderPage from './pages/Routine';
import FocusMoodTrackerPage from './pages/Focus';
import QuizPage from './pages/QuizPage';
import Chat from "./pages/Chat";
import FirstQuiz from "./features/Quiz/FirstQuiz";
import WeeklyQuiz from "./features/Quiz/WeeklyQuiz";
import MoodComic from './features/Quiz/MoodComic';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/features/routine-builder"
          element={<RoutineBuilderPage />}
        />
        <Route
          path="/features/focus-mood-tracker"
          element={<FocusMoodTrackerPage />}
        />
        <Route path="/features/chat" element={<Chat />} />
        <Route path="/features/quiz" element={<QuizPage />}>
          <Route path="first" element={<FirstQuiz />} />
          <Route path="weekly" element={<WeeklyQuiz />} />
          <Route path="comic" element={<MoodComic />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}