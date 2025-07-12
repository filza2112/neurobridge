
import {React, useState} from 'react';
import image1 from '../assets/images/image1.png'
import image2 from '../assets/images/image2.png'
import AuthModal from './AuthModal';
import Dashboard from './features';
import Shape from '../assets/images/svg1.svg';
// import AuthModal from './AuthModal';


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


const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const MainContent = ({showButton}) => {
  const [showModal, setShowModal] = useState(false);
  const [isSignupMode, setSignupMode] = useState(false);

  const openModal = (signup = false) => {
    setSignupMode(signup);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  return (
    <>
    <section>

    </section>
     
      <section className="relative bg-primary w-full ">
        <div className="flex flex-col-reverse md:flex-row mx-auto max-w-[920px] items-center md:justify-between py-10 px-4 md:px-0 space-y-8 md:space-y-0 md:space-x-8">
        
          <div className="space-y-5 gap-4 text-center md:text-left">
            <h1 className="text-white text-3xl md:text-4xl font-mullish font-bold leading-[1.2]">
              Empower Your Day, Master Your Mind
            </h1>
            <div className="w-6 h-1 bg-text-secondary mx-auto md:mx-0"></div>
            <p className="text-white font-mullish text-base md:text-[18px] leading-7 opacity-70">
              Build adaptive routines, track focus, engage with AI therapy, and boost skills with our NeuroPlay Zone. Designed for ADHD, Autism, and OCD.
            </p>
            {showButton && (<button className="px-4 py-[12px] md:px-3 md:py-[14px] bg-white text-primary rounded-md hover:bg-text-secondary transition-all duration-200 font-mullish font-bold"
            onClick={() => openModal(false)} >
              Get Started Now
            </button>
            )}
          </div>
        
          <div className="w-full max-w-[350px] md:max-w-[500px] h-[200px] md:h-[300px] text-primary text-center mt-8 md:mt-0 mb-[-10px]">
            <img src={image1} alt="Logo" />;
          </div>
        </div>
      </section>
      <img src={Shape} alt="Logo" />;

    
      <section className="relative mt-[30px] overflow-hidden bg-background py-8 md:py-0">
        <div className="relative w-11/12 max-w-[1080px] mx-auto px-4 md:px-0">
    
          <div className="w-6 h-1 bg-text-secondary mx-auto mt-4 mb-6"></div>
          <section className="relative max-w-[1200px] mx-auto overflow-hidden bg-background py-8 md:py-0">
      </section>
          <div className=" mt-[80px] md:mt-[30px] w-full min-h-[auto] md:min-h-[520px] bg-background-alt flex flex-col md:flex-row rounded-mb relative p-6 md:p-10 md:py-12 border border-accent items-center md:items-stretch">
            <div className="flex flex-col justify-between w-full md:w-1/2 order-2 md:order-1 mt-6 md:mt-0">
              {/* left part */}
              <h3 className="font-mullish text-xl md:text-2xl leading-8 md:leading-10 font-bold max-w-[500px] text-primary text-center md:text-left">
                Effortless Daily Structure with the Neuro+Bridge
              </h3>
              <ul className="space-y-2 mt-4 md:mt-0 text-left">
                <li className="font-mullish flex items-start space-x-2 text-primary">
                  <CheckIcon className="text-text-secondary flex-shrink-0 mt-1" />
                  <span>AI-generated, adaptive task scheduling</span>
                </li>
                <li className="font-mullish flex items-start space-x-2 text-primary">
                  <CheckIcon className="text-text-secondary flex-shrink-0 mt-1" />
                  <span>Personalized for ADHD, Autism, & OCD</span>
                </li>
                <li className="font-mullish flex items-start space-x-2 text-primary">
                  <CheckIcon className="text-text-secondary flex-shrink-0 mt-1" />
                  <span>Build consistent daily habits</span>
                </li>
                <li className="font-mullish flex items-start space-x-2 text-primary">
                  <CheckIcon className="text-text-secondary flex-shrink-0 mt-1" />
                  <span>Support for therapy routines and goals</span>
                </li>
                <li className="font-mullish flex items-start space-x-2 text-primary">
                  <CheckIcon className="text-text-secondary flex-shrink-0 mt-1" />
                  <span>Visual and auditory cues for transitions</span>
                </li>
                <li className="font-mullish flex items-start space-x-2 text-primary">
                  <CheckIcon className="text-text-secondary flex-shrink-0 mt-1" />
                  <span>Integrates with your daily life seamlessly</span>
                </li>
              </ul>
              <div className="flex flex-row items-center space-x-4 mt-6 md:mt-0 justify-center md:justify-start">
                
                <div className="flex items-center cursor-pointer group">
                  {/* <a href="#" className="font-bold font-mullish text-primary group-hover:text-text-secondary transition-all duration-200 text-sm">Learn More</a> */}
                  {/* <RightArrowIcon className="w-4 h-4 text-primary group-hover:text-text-secondary transition-all duration-200" /> */}
                </div>
              </div>
            </div>
        
            <div className="static md:absolute max-w-[400px] md:max-w-[600px] right-0 botton-0 w-full h-[250px] md:h-[300px] flex items-center justify-center text-primary text-center order-1 md:order-2 md:mt-[70px]">
              <img src={image2} alt="Logo" />;
            </div>
          </div>
          
        </div>
        
      </section>
      {/* <div class="w-6 h-1 bg-text-secondary mx-auto mt-4 mb-6"></div> */}
      <h2 className="font-extrabold font-mullish text-center text-xl md:text-2xl leading-[1.2] text-primary mt-[30px]">
            Unlock Your Potential with Our Core Features
      </h2>
      <div class="w-6 h-1 bg-text-secondary mx-auto mt-4 mb-6"></div>
      <AuthModal
        isOpen={showModal}
        onClose={closeModal}
        isSignupMode={isSignupMode}
        setSignupMode={setSignupMode}
      />   
    </>
  );
};

export default MainContent;