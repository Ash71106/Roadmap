
import React from 'react';

const Header: React.FC<{ onRestart: () => void; showRestart: boolean; }> = ({ onRestart, showRestart }) => (
  <header className="py-4 px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between max-w-5xl mx-auto">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
         <h1 className="text-xl font-bold text-slate-800 ml-2">Learn Your Way</h1>
      </div>
     
      {showRestart && (
         <button 
            onClick={onRestart}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
         >
           Start Over
         </button>
      )}
    </div>
  </header>
);

export default Header;
