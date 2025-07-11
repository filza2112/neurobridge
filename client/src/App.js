// client/src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import Dashboard from './pages/homepage';
import Homepage from './pages/homepage';
import RoutineBuilderPage from './pages/Routine';
import FocusMoodTrackerPage from './pages/Focus';
import QuizPage from './pages/QuizPage';
import FirstQuiz from './features/Quiz/FirstQuiz';
import WeeklyQuiz from './features/Quiz/WeeklyQuiz';
import MoodComic from './features/Quiz/MoodComic';
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/AuthModal'

export default function App() {
  const [isSignupMode, setSignupMode] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element ={
      <AuthModal
        isOpen={true}
        onClose={() => {}}
        isSignupMode={isSignupMode}
        setSignupMode={setSignupMode}
      />
      } />

      <Route path="/homepage" element={
          <Homepage />
      } />
      <Route path="/features/routine-builder" element={
          <RoutineBuilderPage />
      } />
      <Route path="/features/focus-mood-tracker" element={
          <FocusMoodTrackerPage />
      } />
      <Route path="/features/quiz" element={
          <QuizPage />
      }>

        <Route path="first" element={<FirstQuiz />} />
        <Route path="weekly" element={<WeeklyQuiz />} />
        <Route path="comic" element={<MoodComic />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
