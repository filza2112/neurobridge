import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/Hero';
import Features from '../components/display';
import Footer from '../components/footer';

const LoginPage = () => {
  const [isSignupMode, setSignupMode] = useState(false);

  return (
    <>
    <Navbar />
    <Hero />
    <Features />
    <Footer />
    </>
  );
};

export default LoginPage;
