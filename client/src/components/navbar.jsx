
import React, { useState } from 'react';
import AuthModal from './AuthModal';


const RightArrowIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    focusable="false"
    className={className}
  >
    <path
      fill="currentColor"
      d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
    ></path>
  </svg>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-primary flex relative z-50">
      <div className="w-full md:w-[1080px] h-[80px] px-4 md:px-0 mx-auto flex justify-between items-center">
        <a href="/" className="cursor-pointer py-7 pr-7">
          <span className="text-white text-xl md:text-2xl font-bold">NeuroCare App</span>
        </a>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>

        <ul className="hidden md:flex space-x-11">
          <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-7 relative group">
            <a href="#">Routine</a>
            <div className="absolute bottom-0 h-1 bg-accent w-full hidden group-hover:block transition-all duration-200"></div>
          </li>
          <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-7 relative group">
            <a href="#">Focus</a>
            <div className="absolute bottom-0 h-1 bg-accent w-full hidden group-hover:block transition-all duration-200"></div>
          </li>
          <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-7 relative group">
            <a href="#">NeuroPlay</a>
            <div className="absolute bottom-0 h-1 bg-accent w-full hidden group-hover:block transition-all duration-200"></div>
          </li>
          <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-7 relative group">
            <a href="#">Quiz</a>
            <div className="absolute bottom-0 h-1 bg-accent w-full hidden group-hover:block transition-all duration-200"></div>
          </li>
        </ul>

        <div className="hidden md:flex space-x-6 items-center">
          {/* <div className="w-[28px] h-[20px] bg-gray-300 flex items-center justify-center text-xs text-gray-700">Lang</div> */}
          <button className="px-5 my-5 py-3 font-mullish text-white border border-accent rounded-sm text-sm font-bold whitespace-nowrap hover:text-primary hover:bg-white">
            Log in
          </button>
          <button className="px-3 py-3 my-5 text-sm rounded-sm font-mullish font-bold bg-white text-primary border border-white hover:text-text-secondary transition-all duration-200 whitespace-nowrap">
            Sign up
            <RightArrowIcon className="w-[14px] h-[14px] ml-3 inline-block" />
          </button>
        </div>
      </div>


      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[80px] left-0 w-full bg-primary flex flex-col items-center pb-4 shadow-lg">
          <ul className="w-full text-center">
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Routine Builder</a>
            </li>
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Focus Tracker</a>
            </li>
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Therapy Companion</a>
            </li>
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>NeuroPlay Zone</a>
            </li>
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Resources</a>
            </li>
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3 border-b border-accent/20">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Support</a>
            </li>
            <li className="text-white font-mullish hover:text-accent transition-all duration-200 cursor-pointer py-3">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            </li>
          </ul>
          <div className="flex flex-col space-y-4 w-full px-4 mt-4">
            <button className="px-5 py-3 font-mullish text-white border border-accent rounded-sm text-sm font-bold w-full">
              Log in
            </button>
            <button className="px-3 py-3 text-sm rounded-sm font-mullish font-bold bg-white text-primary border border-white hover:text-text-secondary transition-all duration-200 w-full">
              Sign up
              <RightArrowIcon className="w-[14px] h-[14px] ml-3 inline-block" />
            </button>
            <div className="w-[28px] h-[20px] bg-gray-300 flex items-center justify-center text-xs text-gray-700 mx-auto mt-4">Lang</div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;