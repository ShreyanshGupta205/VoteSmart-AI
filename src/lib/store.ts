import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StoreState = {
  // Core scores
  score: number;
  userName: string;
  hasTakenQuiz: boolean;
  quizScore: number;
  checklistCompleted: number;
  hasSimulated: boolean;

  // New: Problem Solving Layer
  problemsSolved: string[];          // list of problem IDs resolved
  firstTimeVoter: boolean;           // simplified UI mode
  selectedState: string;             // state code e.g. "MH"
  selectedDistrict: string;
  remindersSet: string[];            // checklist item IDs with reminder toggled

  // Actions
  setUserName: (name: string) => void;
  updateScore: (points: number) => void;
  markQuizTaken: (score: number) => void;
  updateChecklist: (completedItems: number) => void;
  markSimulated: () => void;
  markProblemSolved: (problemId: string) => void;
  setFirstTimeVoter: (val: boolean) => void;
  setSelectedState: (code: string) => void;
  setSelectedDistrict: (district: string) => void;
  toggleReminder: (itemId: string) => void;
  resetAll: () => void;
};

const initialState = {
  score: 0,
  userName: '',
  hasTakenQuiz: false,
  quizScore: 0,
  checklistCompleted: 0,
  hasSimulated: false,
  problemsSolved: [],
  firstTimeVoter: false,
  selectedState: '',
  selectedDistrict: '',
  remindersSet: [],
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUserName: (name) => set({ userName: name }),

      updateScore: (points) =>
        set((state) => ({ score: Math.min(100, Math.max(0, state.score + points)) })),

      markQuizTaken: (score) => {
        const prev = get();
        if (!prev.hasTakenQuiz) {
          set({ hasTakenQuiz: true, quizScore: score });
          get().updateScore(20);
        }
      },

      updateChecklist: (completedItems) => {
        const previousItems = get().checklistCompleted;
        const previousScore = previousItems * 6;
        const newScore = completedItems * 6;
        set({ checklistCompleted: completedItems });
        get().updateScore(newScore - previousScore);
      },

      markSimulated: () => {
        if (!get().hasSimulated) {
          set({ hasSimulated: true });
          get().updateScore(25);
        }
      },

      markProblemSolved: (problemId) => {
        const prev = get().problemsSolved;
        if (!prev.includes(problemId)) {
          const updated = [...prev, problemId];
          set({ problemsSolved: updated });
          // 5 pts per problem, max 5 problems = 25 pts
          if (prev.length < 5) {
            get().updateScore(5);
          }
        }
      },

      setFirstTimeVoter: (val) => set({ firstTimeVoter: val }),

      setSelectedState: (code) => set({ selectedState: code, selectedDistrict: '' }),

      setSelectedDistrict: (district) => set({ selectedDistrict: district }),

      toggleReminder: (itemId) => {
        const prev = get().remindersSet;
        const updated = prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId];
        set({ remindersSet: updated });
      },

      resetAll: () => set(initialState),
    }),
    {
      name: 'votesmart-storage',
    }
  )
);

// Score breakdown helper
export const getScoreBreakdown = (state: StoreState) => ({
  quiz: state.hasTakenQuiz ? 20 : 0,
  checklist: Math.min(30, state.checklistCompleted * 6),
  simulation: state.hasSimulated ? 25 : 0,
  problems: Math.min(25, state.problemsSolved.length * 5),
  total: state.score,
});
