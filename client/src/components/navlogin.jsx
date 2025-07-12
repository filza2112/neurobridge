import React, { useState } from 'react';
import AuthModal from './AuthModal';
import Logo from '../assets/images/logo.png';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignupMode, setSignupMode] = useState(false);

  const openModal = (signup = false) => {
    setSignupMode(signup);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <nav className="bg-primary px-12 py-4 flex justify-between items-center">
        {/* Brand Name */}
        <div className='flex space-x-1'>
          <img src={Logo} alt="" className='h-[50px] w-[50px] mt-[-10px]'/>
<span className="text-transparent bg-gradient-to-r from-white via-accent to-text-secondary bg-clip-text text-xl md:text-3xl font-bold tracking-wide drop-shadow-md">
  NeuroBridge
</span>
</div>


        {/* Auth Buttons */}
        <div className="space-x-4 flex">
          <button
            onClick={() => openModal(false)}
            className="text-white border border-white px-4 py-1 rounded hover:bg-white hover:text-primary transition"
          >
            Log In
          </button>
          <button
            onClick={() => openModal(true)}
            className="bg-white text-primary px-4 py-1 rounded hover:bg-accent hover:text-white transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <AuthModal
        isOpen={showModal}
        onClose={closeModal}
        isSignupMode={isSignupMode}
        setSignupMode={setSignupMode}
      />
    </>
  );
};

export default Navbar;
