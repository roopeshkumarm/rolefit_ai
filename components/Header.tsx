import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 border-b border-slate-700/50">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-teal-300 text-transparent bg-clip-text">
            ROLEFIT&gt;Ai
          </h1>
        </div>
        <p className="mt-2 text-lg text-slate-400">
          Your Personal AI Career Co-Pilot
        </p>
      </div>
    </header>
  );
};
