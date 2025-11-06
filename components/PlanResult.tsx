
import React from 'react';
import { LearningPlan, Resource } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import VideoCameraIcon from './icons/VideoCameraIcon';
import CodeBracketIcon from './icons/CodeBracketIcon';
import MicrophoneIcon from './icons/MicrophoneIcon';

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  Article: BookOpenIcon,
  Video: VideoCameraIcon,
  Project: CodeBracketIcon,
  Podcast: MicrophoneIcon,
  Documentation: BookOpenIcon,
  Course: BookOpenIcon,
};

const ResourceItem: React.FC<{ resource: Resource }> = ({ resource }) => {
  const Icon = iconMap[resource.type] || BookOpenIcon;
  return (
    <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
        <Icon className="w-5 h-5 text-slate-600" />
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">{resource.title}</h4>
        <p className="text-slate-600 text-sm">{resource.description}</p>
      </div>
    </div>
  );
};

interface PlanResultProps {
  plan: LearningPlan;
  onRestart: () => void;
}

const PlanResult: React.FC<PlanResultProps> = ({ plan, onRestart }) => {
  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-3">{plan.title}</h1>
        <p className="text-lg text-slate-600">Your personalized roadmap to mastery awaits. Let's get started!</p>
      </div>
      
      <div className="space-y-8">
        {plan.plan.sort((a,b) => a.step - b.step).map((step) => (
          <div key={step.step} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {step.step}
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{step.title}</h2>
            </div>
            <p className="text-slate-600 mb-6 ml-16">{step.description}</p>
            <div className="ml-16">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Suggested Resources:</h3>
              <div className="space-y-3">
                {step.resources.map((resource, index) => (
                  <ResourceItem key={index} resource={resource} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button 
          onClick={onRestart}
          className="px-8 py-3 bg-slate-700 text-white font-bold rounded-full hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700"
        >
          Create a New Plan
        </button>
      </div>
    </div>
  );
};

export default PlanResult;
