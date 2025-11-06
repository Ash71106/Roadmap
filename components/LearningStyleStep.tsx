
import React, { useState } from 'react';
import { LearningStyle } from '../types';
import CheckIcon from './icons/CheckIcon';

interface LearningStyleStepProps {
  onGenerate: (styles: LearningStyle[]) => void;
}

const LearningStyleStep: React.FC<LearningStyleStepProps> = ({ onGenerate }) => {
  const [selectedStyles, setSelectedStyles] = useState<LearningStyle[]>([]);
  const styles = Object.values(LearningStyle);

  const toggleStyle = (style: LearningStyle) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  const handleSubmit = () => {
    if (selectedStyles.length > 0) {
      onGenerate(selectedStyles);
    }
  };

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">How do you like to learn?</h2>
      <p className="text-slate-600 mb-8 max-w-xl mx-auto">Choose one or more styles. We'll find resources that match your preference.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
        {styles.map((style) => {
          const isSelected = selectedStyles.includes(style);
          return (
            <button
              key={style}
              onClick={() => toggleStyle(style)}
              className={`relative flex flex-col items-center justify-center p-6 border-2 rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-400 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-blue-400'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4" />
                </div>
              )}
              <h3 className="text-md font-bold text-slate-800">{style}</h3>
            </button>
          );
        })}
      </div>
      <button
        onClick={handleSubmit}
        disabled={selectedStyles.length === 0}
        className="px-12 py-4 bg-green-500 text-white text-lg font-bold rounded-full hover:bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Create My Plan
      </button>
    </div>
  );
};

export default LearningStyleStep;
