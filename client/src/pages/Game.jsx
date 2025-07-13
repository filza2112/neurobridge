import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/Hero';
import Features from '../components/display';
import Footer from '../components/footer';
import GameCards from '../components/GameCards';

const LoginPage = () => {

  return (
    <>
    <Navbar />
    <GameCards />
    <Footer />
    </>
  );
};

export default LoginPage;