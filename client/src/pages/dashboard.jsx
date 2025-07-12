import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import MoodChart from "../features/FocusandMood/MoodChart";
import FocusChart from "../features/FocusandMood/FocusChart";

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
            <div className="space-y-4">
              <MoodChart />
              <FocusChart />
            </div>
          </DashboardCard>

          {/* Routine Section */}
          <DashboardCard title="Routine">
            <p className="text-gray-600">
              Track your daily habits and routines here.
            </p>
            {/* TODO: Add Routine component */}
          </DashboardCard>

          {/* Quiz Section */}
          <DashboardCard title="Quiz">
            <p className="text-gray-600">
              Take your quiz or view weekly results.
            </p>
            {/* TODO: Add Quiz chart / summary / CTA */}
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
