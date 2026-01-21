
import React from 'react';
import { Screen, World } from '../types';
import { WORLDS } from '../data';

interface Props {
  onNavigate: (screen: Screen, params?: any) => void;
}

const WorldSelectionScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-full p-6 bg-gradient-to-b from-sky-100 to-white">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => onNavigate(Screen.HOME)}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-md border-b-4 border-gray-200 active:scale-95"
        >
          ⬅️
        </button>
        <h1 className="title-font text-3xl text-blue-900">Select World</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WORLDS.map((world, idx) => (
          <button
            key={world.id}
            onClick={() => onNavigate(Screen.LEVELS, { world })}
            className={`flex items-center p-6 rounded-3xl ${world.color} text-white shadow-xl hover:scale-[1.02] transition-transform active:scale-95 text-left relative overflow-hidden group`}
          >
            <div className="absolute right-[-20px] bottom-[-20px] text-9xl opacity-10 group-hover:rotate-12 transition-transform">
              {world.icon}
            </div>
            <div className="text-5xl mr-6 bg-white/20 p-4 rounded-2xl">
              {world.icon}
            </div>
            <div className="flex-1">
              <h2 className="title-font text-2xl mb-1">{world.name}</h2>
              <p className="text-white/80 text-sm leading-tight">{world.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/3 rounded-full"></div>
                </div>
                <span className="text-xs font-bold">33%</span>
              </div>
            </div>
          </button>
        ))}
        
        {/* Placeholder for coming soon */}
        <div className="flex items-center p-6 rounded-3xl bg-gray-200 text-gray-400 shadow-md border-2 border-dashed border-gray-300 opacity-60">
          <div className="text-5xl mr-6 grayscale">🔒</div>
          <div>
            <h2 className="title-font text-2xl mb-1">Coming Soon</h2>
            <p className="text-sm">More adventures are being built!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldSelectionScreen;
