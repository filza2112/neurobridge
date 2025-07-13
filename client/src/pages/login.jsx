import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';
import Navbar from '../components/navlogin';
import Hero from '../components/Hero';
import Features from '../components/display';
import Footer from '../components/footer';

const LoginPage = () => {
  const [isSignupMode, setSignupMode] = useState(false);
  

  return (
    <>
    <Navbar />
    <Hero showButton={true}/>
    <Features />
    <Footer />
    </>
  );
};

export default LoginPage;
