import {React, useState} from "react";
import { Link } from "react-router-dom";
import AuthModal from './AuthModal';


const features = [
  {
    id: "routine-builder",
    icon: "✨",
    title: "Routine Builder",
    description: "AI-generated, adaptive task scheduler for daily structure and therapy routines",
    tags: ["ADHD", "Autism", "OCD"],
  },
  {
    id: "focus-mood-tracker",
    icon: "🎯",
    title: "Focus Tracker",
    description: "Passive tracking using phone usage, typing patterns",
    tags: ["ADHD", "Autism"], 
  },
  {
    id: "quiz",
    icon: "🧠",
    title: "Quiz for ADHD, OCD, Autism",
    description: "Quick screening quizzes for individuals and therapists",
    tags: ["OCD", "Autism", "ADHD+Therapist-focused"],

  },
  {
    id: "neuroplay-zone",
    icon: "🎮",
    title: "NeuroPlay Zone",
    description: "Gamified brain training zone with adaptive levels for attention, inhibition control, and social skills",
    tags: ["ADHD", "Autism", "OCD"],
  },
  {
    id: "Chat",
    icon: "🎮",
    title: "AI-Therapist",
    description:
      "Gamified brain training zone with adaptive levels for attention, inhibition control, and social skills",
    tags: ["ADHD", "Autism", "OCD"],
  },
  {
    id: "focus-mood-tracker",
    icon: "😊",
    title: "Mood Tracker",
    description: "Passive tracking using phone usage, typing patterns",
    tags: ["ADHD", "Autism"], 
  },
];

export default function FeatureSection() {
const [showModal, setShowModal] = useState(false);
  const [isSignupMode, setSignupMode] = useState(false);

  const openModal = (signup = false) => {
    setSignupMode(signup);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-[#FFFFFF] max-w-[1100px] mx-auto">
      {features.map((feature) => (
        <Link
          key={feature.id}
          className="rounded-2xl shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#CCE3DE] bg-[#EAF4F4] p-5 block no-underline" // 'block no-underline' to make Link behave like a div and remove default link underline
        >
          <div className="text-3xl mb-2">{feature.icon}</div>
          <h2 className="text-xl font-semibold text-[#6B9080]">
            {feature.title}
          </h2>
          <p className="text-sm text-[#6B9080] mt-2">{feature.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {feature.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-[#A4C3B2] text-white text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </Link>
      ))}
      <AuthModal
        isOpen={showModal}
        onClose={closeModal}
        isSignupMode={isSignupMode}
        setSignupMode={setSignupMode}
      />
    </div>
  );
}