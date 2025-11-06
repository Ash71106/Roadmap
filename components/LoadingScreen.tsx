
import React, { useState, useEffect } from 'react';

const messages = [
  "Consulting the knowledge archives...",
  "Tailoring your learning path...",
  "Finding the best resources for you...",
  "Crafting your personalized plan...",
  "Just a moment more..."
];

const LoadingScreen: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="relative w-16 h-16">
          <div className="absolute border-4 border-t-4 border-slate-200 border-t-blue-500 rounded-full w-full h-full animate-spin"></div>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mt-8">Building your plan...</h2>
      <p className="text-slate-600 mt-2 transition-opacity duration-500">{messages[currentMessageIndex]}</p>
    </div>
  );
};

export default LoadingScreen;
