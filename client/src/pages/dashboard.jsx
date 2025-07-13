import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import MoodChart from "../features/FocusandMood/MoodChart";
import FocusChart from "../features/FocusandMood/FocusChart";
import WeeklyProgressChart from "../components/WeeklyProgressChart";

import TopTriggersCard from "../components/triggers"; 
import TopDistractionCard from "../components/distraction"; 
import TaskAnalytics from "../features/RoutineBuilder/TaskAnalytics";
import MoodCalendar from "../components/MoodCalendar";

const userId = localStorage.getItem("userId");

const Dashboard = () => {
  
  return (
    <div className="font-mullish bg-background min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-4 py-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Your Dashboard
        </h1>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Combined Focus & Mood Section */}
          <DashboardCard title="Focus & Mood">
            <div className="space-y-4"></div>
            <DashboardCard title="Mood Calendar">
              <MoodCalendar userId={userId} />
            </DashboardCard>

            <TopDistractionCard userId={userId} />
          </DashboardCard>

          {/* Routine Section */}
          <DashboardCard title="Routine">
            <p className="text-gray-600">
              Track your daily habits and routines here.
            </p>
            <TaskAnalytics userId={userId} />
          </DashboardCard>

          {/* Quiz Section */}
          <DashboardCard title="Quiz">
            <p className="text-gray-600">
              Take your quiz or view weekly results.
            </p>
            <WeeklyProgressChart />
          </DashboardCard>

          {/* Triggers Section */}
          <DashboardCard title="Quiz">
            <p className="text-gray-600">Triggers.</p>
            <TopTriggersCard />
          </DashboardCard>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const DashboardCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

export default Dashboard;
