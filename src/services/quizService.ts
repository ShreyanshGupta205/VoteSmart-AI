import quizData from "@/data/quiz.json";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const quizService = {
  getQuestions: (): QuizQuestion[] => {
    return quizData;
  },
  
  getQuestionById: (id: number): QuizQuestion | undefined => {
    return quizData.find((q) => q.id === id);
  }
};
