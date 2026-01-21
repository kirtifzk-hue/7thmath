
import React from 'react';
import { Screen, World, Level } from '../types';

interface Props {
  world: World;
  onNavigate: (screen: Screen, params?: any) => void;
}

const LevelSelectionScreen: React.FC<Props> = ({ world, onNavigate }) => {
  return (
    <div className="min-h-full p-6 bg-white">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => onNavigate(Screen.WORLDS)}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-md border-2 border-gray-100 active:scale-95"
        >
          ⬅️
        </button>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{world.name}</span>
          <h1 className="title-font text-3xl text-gray-800">Choose Level</h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-lg mx-auto">
        {world.levels.map((level, idx) => (
          <button
            key={level.id}
            disabled={!level.unlocked}
            onClick={() => onNavigate(Screen.MISSION, { level })}
            className={`flex items-center p-5 rounded-2xl border-2 transition-all group ${
              level.unlocked 
                ? 'bg-blue-50 border-blue-200 hover:border-blue-400 active:scale-[0.98]' 
                : 'bg-gray-50 border-gray-200 opacity-70 grayscale'
            }`}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center title-font text-xl shadow-inner mr-4 ${
              level.completed ? 'bg-green-500 text-white' : 'bg-white text-blue-500'
            }`}>
              {level.completed ? '✔️' : idx + 1}
            </div>
            <div className="flex-1 text-left">
              <h3 className={`font-bold text-lg ${level.unlocked ? 'text-blue-900' : 'text-gray-400'}`}>
                {level.title}
              </h3>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3].map(s => (
                  <span key={s} className={`text-lg ${s <= level.stars ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
                ))}
              </div>
            </div>
            {!level.unlocked && <div className="text-2xl">🔒</div>}
            {level.unlocked && <div className="text-xl group-hover:translate-x-1 transition-transform">➡️</div>}
          </button>
        ))}
      </div>
      
      {world.levels.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="title-font text-2xl text-gray-400">Under Construction</h2>
          <p className="text-gray-400">Arya is still placing blocks here!</p>
        </div>
      )}
    </div>
  );
};

export default LevelSelectionScreen;
