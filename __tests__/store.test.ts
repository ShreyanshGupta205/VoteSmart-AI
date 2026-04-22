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
    
    markQuizTaken();
    expect(useStore.getState().hasTakenQuiz).toBe(true);
    expect(useStore.getState().score).toBe(20); // Adds 20 points

    // Running it again shouldn't add more points
    markQuizTaken();
    expect(useStore.getState().score).toBe(20);
  });
});
