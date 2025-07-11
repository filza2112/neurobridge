import React, { useState } from 'react';
import AuthModal from './AuthModal';

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
        <h1 className="text-white text-[27px] font-bold">Neuro+ Bridge</h1>

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
