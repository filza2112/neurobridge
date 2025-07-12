import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Features from '../components/features';
import MoodChart from '../features/FocusandMood/MoodChart';
import FocusChart from '../features/FocusandMood/FocusChart';

const Dashboard = () => {
  return (
    <div className="font-mullish bg-background min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-4 py-6">
        <div className="flex flex-col-reverse md:flex-row gap-6">

          {/* Features section */}
          <div className="w-full md:w-1/3 bg-white p-4 rounded-2xl shadow-md align-center">
          <h2 className="text-center font-bold text-text-dark font-mullish text-xl">Features</h2>
           <Features />
          </div>
          
          {/* Charts section */}
          <div className="w-full md:w-2/3 flex flex-col gap-4">
            <div className="bg-white p-4 h-64 md:h-72">
              <MoodChart />
            </div>
            <div className="bg-white p-4 h-64 md:h-72">
              <FocusChart />
            </div>
          </div>

        
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
