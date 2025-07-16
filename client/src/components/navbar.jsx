import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Logo from '../assets/images/logo.png';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout(navigate);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-primary flex relative z-50">
        <div className="w-full md:w-[1300px] h-[80px] px-4 md:px-0 mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="/homepage" className="cursor-pointer py-7 pr-7">
            <div className="flex space-x-1">
              <img src={Logo} alt="" className="h-[50px] w-[50px] mt-[-10px]" />
              <span className="text-transparent bg-gradient-to-r from-white via-accent to-text-secondary bg-clip-text text-xl md:text-3xl font-bold tracking-wide drop-shadow-md">
                NeuroBridge
              </span>
            </div>
          </a>

          {/* Hamburger Menu Button for Mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
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
              <Link to="/features/game">NeuroPlay</Link>
              <div className="absolute bottom-0 h-1 bg-accent w-full hidden group-hover:block transition-all duration-200"></div>
            </li>
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-7 relative group">
              <Link to="/features/quiz">Quiz</Link>
              <div className="absolute bottom-0 h-1 bg-accent w-full hidden group-hover:block transition-all duration-200"></div>
            </li>
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-7 relative group">
              <Link to="/features/chat">AI Therapist</Link>
              <div className="absolute bottom-0 h-1 bg-accent w-full hidden group-hover:block transition-all duration-200"></div>
            </li>
          </ul>

          {/* Desktop Auth Actions */}
          {
            <div className="hidden md:flex space-x-6 items-center">
              <Link
                to="/dashbaord"
                className="px-5 my-5 py-3 font-mullish text-white border border-accent rounded-sm text-sm font-bold whitespace-nowrap hover:text-primary hover:bg-white"
              >
                Dashboard
              </Link>
              <Link
                to="/"
                className="px-5 my-5 py-3 font-mullish text-white border border-accent rounded-sm text-sm font-bold whitespace-nowrap hover:text-primary hover:bg-white"
              >
                Log Out
              </Link>
            </div>
          }
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[80px] left-0 w-full bg-primary flex flex-col items-center pb-4 shadow-lg">
            <ul className="w-full text-center">
              <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
                <Link
                  to="/features/routine-builder"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Routine Builder
                </Link>
              </li>
              <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
                <Link
                  to="/features/focus-mood-tracker"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Focus Tracker
                </Link>
              </li>
              <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
                <Link
                  to="/features/neuroplay-zone"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  NeuroPlay Zone
                </Link>
              </li>
              <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
                <Link
                  to="/features/quiz"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Quiz
                </Link>
              </li>
              <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
                <Link to="/features/Chat">Chat</Link>
                <div className="absolute bottom-0 h-1 bg-accent w-full hidden group-hover:block transition-all duration-200"></div>
              </li>
            </ul>
            <div className="flex flex-col space-y-4 w-full px-4 mt-4">
              <Link
                to="/dashbaord"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-5 py-3 text-center font-mullish text-white border border-accent rounded-sm text-sm font-bold w-full hover:bg-white hover:text-primary"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-3 font-mullish text-white border border-accent rounded-sm text-sm font-bold w-full hover:bg-white hover:text-primary"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
