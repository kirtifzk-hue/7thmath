
import React from 'react';
import { Screen, UserStats } from '../types';
import { ALL_CHAPTERS } from '../data';

interface Props {
  userStats: UserStats;
  onNavigate: (screen: Screen, params?: any) => void;
}

const ParentReportScreen: React.FC<Props> = ({ userStats, onNavigate }) => {
  return (
    <div className="min-h-full p-6 bg-gray-50">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => onNavigate(Screen.HOME)}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-md border-b-4 border-gray-200 active:scale-95"
        >
          ⬅️
        </button>
        <h1 className="title-font text-3xl text-gray-800">Learning Progress</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
          <span className="text-4xl mb-2">🔥</span>
          <span className="text-2xl font-bold text-orange-600">5 Days</span>
          <span className="text-sm text-gray-400">Streak</span>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
          <span className="text-4xl mb-2">✨</span>
          <span className="text-2xl font-bold text-blue-600">12</span>
          <span className="text-sm text-gray-400">Total Stars</span>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
          <span className="text-4xl mb-2">⏳</span>
          <span className="text-2xl font-bold text-green-600">45m</span>
          <span className="text-sm text-gray-400">Play Time</span>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
        <h2 className="title-font text-xl text-gray-700 mb-6">Chapter Breakdown</h2>
        <div className="flex flex-col gap-6">
          {ALL_CHAPTERS.slice(0, 5).map((chapter, i) => {
            const progress = i === 0 ? 33 : i === 1 ? 15 : 0;
            return (
              <div key={chapter} className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-700">{chapter}</span>
                  <span className="text-gray-400 font-medium">{progress}%</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${progress > 0 ? 'bg-blue-500' : 'bg-gray-200'}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-10 p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-100">
          <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-1">
            <span>💡</span> Arya's Insight
          </h3>
          <p className="text-sm text-yellow-700">
            Great progress in Integers! Needs a bit more practice in negative number subtraction. Try the "Number Line Adventure" game together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentReportScreen;
