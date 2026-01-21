
import { World } from './types';

export const WORLDS: World[] = [
  {
    id: 1,
    name: "Integers Kingdom",
    icon: "🏰",
    description: "Explore the magical land of positive and negative numbers.",
    color: "bg-blue-500",
    levels: [
      {
        id: "1-1",
        title: "Adding Heroes",
        unlocked: true,
        completed: false,
        stars: 0,
        questions: [
          {
            id: "q1",
            text: "A diver is 5m below sea level (-5). If he dives 3m deeper, where is he now?",
            type: "MCQ",
            options: ["-8m", "-2m", "8m", "2m"],
            answer: "-8m",
            explanation: "When we move 'deeper', we add a negative value. -5 + (-3) = -8."
          },
          {
            id: "q2",
            text: "What is (-10) + 15?",
            type: "MCQ",
            options: ["5", "-5", "25", "-25"],
            answer: "5",
            explanation: "Starting at -10 and moving 15 steps to the right on the number line lands us on 5."
          }
        ]
      },
      {
        id: "1-2",
        title: "Subtraction Bridge",
        unlocked: false,
        completed: false,
        stars: 0,
        questions: []
      }
    ]
  },
  {
    id: 2,
    name: "Fraction Forest",
    icon: "🌲",
    description: "Discover the hidden parts of the whole.",
    color: "bg-green-500",
    levels: []
  },
  {
    id: 3,
    name: "Equation Island",
    icon: "⚖️",
    description: "Balance the scales of mystery.",
    color: "bg-orange-500",
    levels: []
  },
  {
    id: 4,
    name: "Geometric Galaxy",
    icon: "📐",
    description: "Lines, angles, and shapes among the stars.",
    color: "bg-purple-500",
    levels: []
  },
  {
    id: 5,
    name: "Probability Peaks",
    icon: "🏔️",
    description: "Handling data at high altitudes.",
    color: "bg-pink-500",
    levels: []
  }
];

export const ALL_CHAPTERS = [
  "Integers", "Fractions and Decimals", "Data Handling", "Simple Equations", 
  "Lines and Angles", "The Triangle and its Properties", "Congruence of Triangles",
  "Comparing Quantities", "Rational Numbers", "Perimeter and Area",
  "Algebraic Expressions", "Exponents and Powers", "Symmetry", "Visualising Solid Shapes"
];
