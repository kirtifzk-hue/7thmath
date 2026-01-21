
import React from 'react';
import { Screen, UserStats } from '../types';
import AryaMascot from './AryaMascot';

interface Props {
  userStats: UserStats;
  onNavigate: (screen: Screen, params?: any) => void;
}

const HomeScreen: React.FC<Props> = ({ userStats, onNavigate }) => {
  return (
    <div className="h-full flex flex-col p-6 items-center justify-between">
      {/* Header Bar */}
      <div className="w-full flex justify-between items-center bg-white/80 p-4 rounded-3xl shadow-sm border-2 border-sky-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🪙</span>
          <span className="font-bold text-sky-800">{userStats.coins}</span>
        </div>
        <div className="title-font text-2xl text-blue-600 tracking-wider">Math Adventure</div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <span className="font-bold text-sky-800">{userStats.stars}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <AryaMascot mood="happy" message="Ready for today's mission, Captain?" />
        <div className="bg-white/90 p-6 rounded-3xl shadow-xl border-4 border-blue-400 w-full max-w-sm text-center">
          <h2 className="title-font text-3xl text-blue-800 mb-2">Daily Quest</h2>
          <p className="text-gray-600 mb-4">Solve 3 Integer problems to earn 50 coins!</p>
          <button 
            onClick={() => onNavigate(Screen.WORLDS)}
            className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white py-4 rounded-2xl title-font text-xl shadow-lg border-b-4 border-blue-700"
          >
            PLAY NOW!
          </button>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="w-full flex justify-around items-center mb-4">
        <button 
          onClick={() => onNavigate(Screen.PARENT_REPORT)}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">📊</div>
          <span className="text-sm font-bold text-pink-600">Report</span>
        </button>
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🏆</div>
          <span className="text-sm font-bold text-yellow-600">Badges</span>
        </button>
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">⚙️</div>
          <span className="text-sm font-bold text-green-600">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
