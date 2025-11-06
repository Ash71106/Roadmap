
import React from 'react';

const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = ["What to learn?", "Your knowledge", "Learning style"];

  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 mb-8">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={stepNumber} className="flex items-center space-x-2">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : isCompleted
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              {isCompleted ? '✓' : stepNumber}
            </div>
            <span className={`hidden sm:inline text-sm font-medium ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
