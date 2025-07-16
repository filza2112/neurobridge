import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import DashBoard from './pages/dashboard';
import Homepage from './pages/homepage';
import RoutineBuilderPage from './pages/Routine';
import FocusMoodTrackerPage from './pages/Focus';
import QuizPage from './pages/QuizPage';
import Chat from "./pages/Chat";
import FirstQuiz from "./features/Quiz/FirstQuiz";
import WeeklyQuiz from "./features/Quiz/WeeklyQuiz";
import MoodComic from './features/Quiz/MoodComic';
import Game from './pages/Game';
import MemoryGame from './components/MemoryGame';





export default function App() {

  return (
    
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/dashbaord" element={<DashBoard />} />
        <Route path="/features/game" element={<Game />} />
  <Route path="/features/game/Memory" element={<MemoryGame />} />




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
  
  );
}



