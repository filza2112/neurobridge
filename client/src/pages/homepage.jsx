
import React from 'react';
import Navbar from '../components/navbar';
// import MainContent from '../components/Hero';
import Footer from '../components/footer';
import Features from '../components/features'

const LandingPage = () => {
  return (
    <div className="font-mullish bg-background">
      <Navbar />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;