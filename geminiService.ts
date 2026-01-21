
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getPersonalizedExplanation(question: string, userAnswer: string, correctAnswer: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am a Class 7 student. I answered "${userAnswer}" for the question "${question}". The correct answer is "${correctAnswer}". Explain why I was wrong and how to get it right using a friendly, encouraging mascot tone named 'Arya'. Keep it short and visual (using emojis).`,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      return response.text || "Oops! Let's try to look at it this way...";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Don't worry! Everyone makes mistakes. Let's learn from this one together!";
    }
  }

  async generateDailyChallenge(): Promise<{ question: string; options: string[]; answer: string }> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate a fun Class 7 NCERT math question about Integers or Fractions. Provide the question, 4 options, and the correct answer in JSON format.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              answer: { type: Type.STRING }
            },
            required: ["question", "options", "answer"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      return {
        question: "What is 7 + (-5)?",
        options: ["2", "-2", "12", "-12"],
        answer: "2"
      };
    }
  }
}
