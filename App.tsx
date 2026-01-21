
import React, { useState, useEffect, useCallback } from 'react';
import { Screen, UserStats, World, Level, Question } from './types';
import { WORLDS } from './data';
import HomeScreen from './components/HomeScreen';
import WorldSelectionScreen from './components/WorldSelectionScreen';
import LevelSelectionScreen from './components/LevelSelectionScreen';
import MissionScreen from './components/MissionScreen';
import CompletionScreen from './components/CompletionScreen';
import ParentReportScreen from './components/ParentReportScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [userStats, setUserStats] = useState<UserStats>({
    coins: 100,
    stars: 12,
    badges: ['First Step'],
    currentWorldId: 1,
    currentLevelId: '1-1'
  });
  
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [missionResults, setMissionResults] = useState<{ score: number, total: number } | null>(null);

  // Sound effects logic (mock)
  const playSound = (type: 'correct' | 'wrong' | 'click' | 'victory') => {
    // In a real app, use an Audio object
    console.log(`Sound playing: ${type}`);
  };

  const handleNavigate = (screen: Screen, params?: any) => {
    playSound('click');
    if (params?.world) setSelectedWorld(params.world);
    if (params?.level) setSelectedLevel(params.level);
    if (params?.results) setMissionResults(params.results);
    setCurrentScreen(screen);
  };

  const updateProgress = (earnedCoins: number, earnedStars: number) => {
    setUserStats(prev => ({
      ...prev,
      coins: prev.coins + earnedCoins,
      stars: prev.stars + earnedStars
    }));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.HOME:
        return <HomeScreen userStats={userStats} onNavigate={handleNavigate} />;
      case Screen.WORLDS:
        return <WorldSelectionScreen onNavigate={handleNavigate} />;
      case Screen.LEVELS:
        return <LevelSelectionScreen world={selectedWorld!} onNavigate={handleNavigate} />;
      case Screen.MISSION:
        return (
          <MissionScreen 
            level={selectedLevel!} 
            onNavigate={handleNavigate} 
            updateProgress={updateProgress}
            playSound={playSound}
          />
        );
      case Screen.COMPLETION:
        return (
          <CompletionScreen 
            results={missionResults!} 
            onNavigate={handleNavigate} 
            playSound={playSound}
          />
        );
      case Screen.PARENT_REPORT:
        return <ParentReportScreen userStats={userStats} onNavigate={handleNavigate} />;
      default:
        return <HomeScreen userStats={userStats} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-sky-50 relative flex flex-col">
      {/* Dynamic Background elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-200 rounded-full blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      
      {/* Main Content */}
      <div className="flex-1 relative z-10 overflow-auto">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
