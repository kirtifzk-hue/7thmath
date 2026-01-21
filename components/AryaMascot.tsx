
import React from 'react';

interface Props {
  mood: 'happy' | 'thinking' | 'encouraging' | 'celebrating';
  message?: string;
}

const AryaMascot: React.FC<Props> = ({ mood, message }) => {
  const getIcon = () => {
    switch (mood) {
      case 'happy': return '🤖';
      case 'thinking': return '🤔';
      case 'encouraging': return '💡';
      case 'celebrating': return '🎉';
      default: return '🤖';
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div className="text-8xl animate-float">
          {getIcon()}
        </div>
        <div className="absolute -top-4 -right-2 bg-white px-2 py-1 rounded-full border-2 border-blue-200 text-xs font-bold text-blue-500 shadow-sm">
          Arya
        </div>
      </div>
      {message && (
        <div className="relative bg-white p-4 rounded-2xl rounded-tl-none border-2 border-blue-300 shadow-lg max-w-xs text-center font-medium text-blue-900 animate-in slide-in-from-left">
          <div className="absolute top-0 -left-3 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent"></div>
          {message}
        </div>
      )}
    </div>
  );
};

export default AryaMascot;
