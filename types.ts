
export enum Screen {
  HOME = 'HOME',
  WORLDS = 'WORLDS',
  LEVELS = 'LEVELS',
  MISSION = 'MISSION',
  COMPLETION = 'COMPLETION',
  PARENT_REPORT = 'PARENT_REPORT'
}

export interface Question {
  id: string;
  text: string;
  type: 'MCQ' | 'DRAG_DROP' | 'NUMBER_LINE';
  options?: string[];
  answer: string;
  explanation: string;
  visualData?: any;
}

export interface Level {
  id: string;
  title: string;
  unlocked: boolean;
  completed: boolean;
  stars: number;
  questions: Question[];
}

export interface World {
  id: number;
  name: string;
  icon: string;
  description: string;
  color: string;
  levels: Level[];
}

export interface UserStats {
  coins: number;
  stars: number;
  badges: string[];
  currentWorldId: number;
  currentLevelId: string;
}
