
import React, { useState, useEffect } from 'react';
import { Screen, Level, Question } from '../types';
import { GeminiService } from '../geminiService';
import AryaMascot from './AryaMascot';

interface Props {
  level: Level;
  onNavigate: (screen: Screen, params?: any) => void;
  updateProgress: (coins: number, stars: number) => void;
  playSound: (type: 'correct' | 'wrong' | 'click' | 'victory') => void;
}

const MissionScreen: React.FC<Props> = ({ level, onNavigate, updateProgress, playSound }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFeedbackShowing, setIsFeedbackShowing] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const gemini = new GeminiService();
  const currentQuestion = level.questions[currentQuestionIdx];

  useEffect(() => {
    if (timeLeft > 0 && !isFeedbackShowing) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isFeedbackShowing]);

  const handleSubmit = async () => {
    if (!selectedOption) return;

    const correct = selectedOption === currentQuestion.answer;
    setIsCorrect(correct);
    setIsFeedbackShowing(true);
    
    if (correct) {
      playSound('correct');
      setScore(s => s + 1);
    } else {
      playSound('wrong');
      setLoadingAi(true);
      const explanation = await gemini.getPersonalizedExplanation(
        currentQuestion.text,
        selectedOption,
        currentQuestion.answer
      );
      setAiExplanation(explanation);
      setLoadingAi(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < level.questions.length - 1) {
      setCurrentQuestionIdx(idx => idx + 1);
      setSelectedOption(null);
      setIsFeedbackShowing(false);
      setIsCorrect(null);
      setAiExplanation('');
      setTimeLeft(30);
    } else {
      updateProgress(score * 10, 3);
      playSound('victory');
      onNavigate(Screen.COMPLETION, { results: { score, total: level.questions.length } });
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header Info */}
      <div className="p-4 bg-blue-500 text-white flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate(Screen.LEVELS)} className="text-2xl mr-2">✖️</button>
          <div className="h-3 w-32 bg-blue-700 rounded-full overflow-hidden border border-white/20">
            <div 
              className="h-full bg-yellow-400 transition-all duration-500" 
              style={{ width: `${((currentQuestionIdx + 1) / level.questions.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs font-bold">{currentQuestionIdx + 1}/{level.questions.length}</span>
        </div>
        <div className={`px-4 py-1 rounded-full font-bold ${timeLeft < 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-600'}`}>
          ⏱️ {timeLeft}s
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="bg-sky-50 p-6 rounded-3xl border-2 border-sky-100 shadow-inner mb-8 min-h-[150px] flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-blue-900 leading-relaxed text-center">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options?.map((option, idx) => (
            <button
              key={idx}
              disabled={isFeedbackShowing}
              onClick={() => setSelectedOption(option)}
              className={`p-5 rounded-2xl border-b-4 transition-all text-lg font-bold text-left relative overflow-hidden group ${
                selectedOption === option 
                  ? 'bg-blue-500 border-blue-700 text-white translate-y-1' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-4 text-blue-300 opacity-50 group-hover:opacity-100 transition-opacity">
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Action Area */}
      <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        {!isFeedbackShowing ? (
          <button
            disabled={!selectedOption}
            onClick={handleSubmit}
            className={`w-full py-4 rounded-2xl title-font text-xl shadow-lg transition-all ${
              selectedOption 
                ? 'bg-green-500 border-b-4 border-green-700 text-white active:scale-95' 
                : 'bg-gray-200 text-gray-400 border-b-4 border-gray-300'
            }`}
          >
            CHECK ANSWER
          </button>
        ) : (
          <div className="animate-in slide-in-from-bottom flex flex-col gap-4">
            <div className={`p-5 rounded-2xl border-2 flex items-start gap-4 ${
              isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="text-4xl">
                {isCorrect ? '🌟' : '💡'}
              </div>
              <div className="flex-1">
                <h4 className={`title-font text-lg ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Spot On!' : 'Wait a minute...'}
                </h4>
                {loadingAi ? (
                  <div className="flex items-center gap-2 text-gray-400 mt-1">
                    <div className="w-4 h-4 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                    <span className="text-sm">Arya is thinking...</span>
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed mt-1">
                    {isCorrect ? 'You nailed this one. Keep up the momentum!' : aiExplanation || currentQuestion.explanation}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-blue-500 border-b-4 border-blue-700 text-white py-4 rounded-2xl title-font text-xl shadow-lg active:scale-95"
            >
              {currentQuestionIdx < level.questions.length - 1 ? 'CONTINUE ➡️' : 'FINISH MISSION 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionScreen;
