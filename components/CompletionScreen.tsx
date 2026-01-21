
import React from 'react';
import { Screen } from '../types';
import AryaMascot from './AryaMascot';

interface Props {
  results: { score: number, total: number };
  onNavigate: (screen: Screen, params?: any) => void;
  playSound: (type: 'correct' | 'wrong' | 'click' | 'victory') => void;
}

const CompletionScreen: React.FC<Props> = ({ results, onNavigate }) => {
  const percentage = Math.round((results.score / results.total) * 100);
  
  return (
    <div className="h-full flex flex-col p-8 items-center justify-center bg-gradient-to-b from-blue-500 to-indigo-600 text-white">
      <div className="mb-8 scale-125">
        <AryaMascot mood="celebrating" />
      </div>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-[3rem] border-2 border-white/20 w-full max-w-sm text-center">
        <h1 className="title-font text-4xl mb-2">Well Done!</h1>
        <p className="text-white/70 mb-8 uppercase tracking-widest font-bold">Mission Complete</p>
        
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <span key={s} className={`text-5xl drop-shadow-lg ${percentage > (s * 30) ? 'animate-bounce' : 'opacity-30 grayscale'}`}>
              ⭐
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/10 p-4 rounded-3xl">
            <span className="block text-3xl mb-1">🪙</span>
            <span className="block font-bold text-xl">+{results.score * 10}</span>
            <span className="text-xs opacity-60">Coins Earned</span>
          </div>
          <div className="bg-white/10 p-4 rounded-3xl">
            <span className="block text-3xl mb-1">🎯</span>
            <span className="block font-bold text-xl">{percentage}%</span>
            <span className="text-xs opacity-60">Accuracy</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate(Screen.LEVELS)}
          className="w-full bg-yellow-400 border-b-4 border-yellow-600 text-indigo-900 py-4 rounded-2xl title-font text-xl shadow-xl hover:bg-yellow-300 transition-all active:scale-95"
        >
          COLLECT REWARDS!
        </button>
      </div>

      <button 
        onClick={() => onNavigate(Screen.HOME)}
        className="mt-8 text-white/60 font-bold hover:text-white transition-colors"
      >
        BACK TO DASHBOARD
      </button>
    </div>
  );
};

export default CompletionScreen;
