import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StoreState = {
  score: number;
  userName: string;
  hasTakenQuiz: boolean;
  checklistCompleted: number;
  hasSimulated: boolean;
  setUserName: (name: string) => void;
  updateScore: (points: number) => void;
  markQuizTaken: () => void;
  updateChecklist: (completedItems: number) => void;
  markSimulated: () => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      score: 0,
      userName: '',
      hasTakenQuiz: false,
      checklistCompleted: 0,
      hasSimulated: false,
      setUserName: (name) => set({ userName: name }),
      updateScore: (points) => set((state) => ({ score: Math.min(100, state.score + points) })),
      markQuizTaken: () => {
        if (!get().hasTakenQuiz) {
          set({ hasTakenQuiz: true });
          get().updateScore(20);
        }
      },
      updateChecklist: (completedItems) => {
        // e.g., max 5 items, each worth 6 points = 30 points max
        const previousScore = get().checklistCompleted * 6;
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
    }),
    {
      name: 'votesmart-storage',
    }
  )
);
