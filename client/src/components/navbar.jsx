import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import AuthModal from './AuthModal';
import { useAuth } from '../AuthContext'; // Import the hook

const RightArrowIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    focusable="false"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path
      fill="currentColor"
      d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
    ></path>
  </svg>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSignupMode, setSignupMode] = useState(false);
  const { token, logout } = useAuth(); // Get auth state and logout function from context

  const openModal = (signup = false) => {
    setSignupMode(signup);
    setShowModal(true);
    setIsMobileMenuOpen(false); // Close mobile menu when opening modal
  };

  const closeModal = () => setShowModal(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false); // Close mobile menu on logout
  };

  return (
    <>
      <nav className="bg-primary flex relative z-50">
        <div className="w-full md:w-[1080px] h-[80px] px-4 md:px-0 mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="cursor-pointer py-7 pr-7">
            <span className="text-white text-xl md:text-2xl font-bold">Neuro+ Bridge</span>
          </a>

          {/* Hamburger Menu Button for Mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>

          {/* Desktop Menu Links */}
          <ul className="hidden md:flex space-x-11">
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-7 relative group">
              <Link to="/features/routine-builder">Routine</Link>
              <div className="absolute bottom-0 h-1 bg-accent w-full hidden group-hover:block transition-all duration-200"></div>
            </li>
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-7 relative group">
              <Link to="/features/focus-mood-tracker">Focus</Link>
              <div className="absolute bottom-0 h-1 bg-accent w-full hidden group-hover:block transition-all duration-200"></div>
            </li>
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-7 relative group">
              <Link to="/features/neuroplay-zone">NeuroPlay</Link>
              <div className="absolute bottom-0 h-1 bg-accent w-full hidden group-hover:block transition-all duration-200"></div>
            </li>
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-7 relative group">
              <Link to="/features/quiz">Quiz</Link>
              <div className="absolute bottom-0 h-1 bg-accent w-full hidden group-hover:block transition-all duration-200"></div>
            </li>
          </ul>

          {/* Desktop Auth Buttons */}
          {/* <div className="hidden md:flex space-x-6 items-center">
            {token ? (
              <button
                onClick={handleLogout}
                className="px-5 my-5 py-3 font-mullish text-white border border-accent rounded-sm text-sm font-bold whitespace-nowrap hover:text-primary hover:bg-white"
              >
                Log Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => openModal(false)}
                  className="px-5 my-5 py-3 font-mullish text-white border border-accent rounded-sm text-sm font-bold whitespace-nowrap hover:text-primary hover:bg-white"
                >
                  Log in
                </button>
                <button
                  onClick={() => openModal(true)}
                  className="px-4 py-3 my-5 text-sm rounded-sm font-mullish font-bold bg-white text-primary border border-white hover:text-text-secondary transition-all duration-200 whitespace-nowrap flex items-center"
                >
                  Sign up
                  <RightArrowIcon className="w-[14px] h-[14px] ml-2" />
                </button>
              </>
            )}
          </div> */}
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[80px] left-0 w-full bg-primary flex flex-col items-center pb-4 shadow-lg">
            <ul className="w-full text-center">
              <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
                <Link to="/features/routine-builder" onClick={() => setIsMobileMenuOpen(false)}>Routine Builder</Link>
              </li>
              <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
                <Link to="/features/focus-mood-tracker" onClick={() => setIsMobileMenuOpen(false)}>Focus Tracker</Link>
              </li>
              <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
                <Link to="/features/neuroplay-zone" onClick={() => setIsMobileMenuOpen(false)}>NeuroPlay Zone</Link>
              </li>
              <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
                <Link to="/features/quiz" onClick={() => setIsMobileMenuOpen(false)}>Quiz</Link>
              </li>
            </ul>
            <div className="flex flex-col space-y-4 w-full px-4 mt-4">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="px-5 py-3 font-mullish text-white border border-accent rounded-sm text-sm font-bold w-full"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => openModal(false)}
                    className="px-5 py-3 font-mullish text-white border border-accent rounded-sm text-sm font-bold w-full"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => openModal(true)}
                    className="px-4 py-3 text-sm rounded-sm font-mullish font-bold bg-white text-primary border border-white hover:text-text-secondary transition-all duration-200 w-full flex items-center justify-center"
                  >
                    Sign up
                    <RightArrowIcon className="w-[14px] h-[14px] ml-2" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {!token && (
        <AuthModal
          isOpen={showModal}
          onClose={closeModal}
          isSignupMode={isSignupMode}
          setSignupMode={setSignupMode}
        />
      )}
    </>
  );
};

export default Navbar;