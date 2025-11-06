
import React, { useState } from 'react';

interface TopicStepProps {
  onNext: (topic: string) => void;
}

const TopicStep: React.FC<TopicStepProps> = ({ onNext }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onNext(topic.trim());
    }
  };

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">What do you want to learn?</h2>
      <p className="text-slate-600 mb-8 max-w-xl mx-auto">Tell us the skill, topic, or subject you're excited to master. Be as specific as you like!</p>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'The basics of Quantum Computing'"
          className="w-full px-5 py-3 text-lg border-2 border-slate-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
          autoFocus
        />
        <button
          type="submit"
          disabled={!topic.trim()}
          className="px-8 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default TopicStep;
