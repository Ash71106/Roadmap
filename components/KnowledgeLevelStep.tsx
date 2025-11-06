
import React from 'react';
import { KnowledgeLevel } from '../types';

interface KnowledgeLevelStepProps {
  onSelect: (level: KnowledgeLevel) => void;
}

const KnowledgeLevelStep: React.FC<KnowledgeLevelStepProps> = ({ onSelect }) => {
  const levels = Object.values(KnowledgeLevel);
  const descriptions = {
    [KnowledgeLevel.NOVICE]: "Starting from scratch with no prior experience.",
    [KnowledgeLevel.BEGINNER]: "I have some basic understanding or have dabbled a bit.",
    [KnowledgeLevel.INTERMEDIATE]: "I have a solid foundation and want to deepen my expertise."
  }

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">How well do you know this topic?</h2>
      <p className="text-slate-600 mb-8 max-w-xl mx-auto">This helps us tailor the starting point of your learning plan.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className="flex flex-col text-left p-6 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 focus:border-blue-500 focus:bg-blue-50 transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <h3 className="text-lg font-bold text-slate-800">{level}</h3>
            <p className="text-slate-500 mt-1 flex-grow">{descriptions[level]}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeLevelStep;
