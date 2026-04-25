import { useStore } from '../src/lib/store';

describe('useStore', () => {
  beforeEach(() => {
    useStore.setState({
      score: 0,
      userName: '',
      hasTakenQuiz: false,
      checklistCompleted: 0,
      hasSimulated: false,
    });
  });

  it('should initialize with default state', () => {
    const state = useStore.getState();
    expect(state.score).toBe(0);
    expect(state.hasTakenQuiz).toBe(false);
    expect(state.problemsSolved).toEqual([]);
    expect(state.remindersSet).toEqual([]);
    expect(state.firstTimeVoter).toBe(false);
  });

  it('should update score correctly up to 100 max', () => {
    const { updateScore } = useStore.getState();
    updateScore(50);
    expect(useStore.getState().score).toBe(50);
    updateScore(60); // Total 110, but should cap at 100
    expect(useStore.getState().score).toBe(100);
  });

  it('should update score when quiz is marked as taken', () => {
    const { markQuizTaken } = useStore.getState();
    markQuizTaken(5);
    expect(useStore.getState().hasTakenQuiz).toBe(true);
    expect(useStore.getState().score).toBe(20); 
    markQuizTaken(5); // Running it again shouldn't add more points
    expect(useStore.getState().score).toBe(20);
  });

  it('should properly track problem solving points', () => {
    const { markProblemSolved } = useStore.getState();
    markProblemSolved('no-id');
    expect(useStore.getState().problemsSolved).toContain('no-id');
    expect(useStore.getState().score).toBe(5); // 5 points for first problem
    markProblemSolved('no-id'); // Duplicate shouldn't add points
    expect(useStore.getState().score).toBe(5);
  });

  it('should calculate checklist points correctly', () => {
    const { updateChecklist } = useStore.getState();
    updateChecklist(3); // 3 items * 6 pts = 18 pts
    expect(useStore.getState().checklistCompleted).toBe(3);
    expect(useStore.getState().score).toBe(18);
    updateChecklist(5); // 5 items * 6 pts = 30 pts (adds 12 more)
    expect(useStore.getState().score).toBe(30);
  });

  it('should handle toggleReminder and firstTimeVoter', () => {
    const { toggleReminder, setFirstTimeVoter } = useStore.getState();
    toggleReminder('roll-check');
    expect(useStore.getState().remindersSet).toContain('roll-check');
    toggleReminder('roll-check');
    expect(useStore.getState().remindersSet).not.toContain('roll-check');

    setFirstTimeVoter(true);
    expect(useStore.getState().firstTimeVoter).toBe(true);
  });
});
