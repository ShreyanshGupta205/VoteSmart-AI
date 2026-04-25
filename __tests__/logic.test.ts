import { getScoreBreakdown, type StoreState } from "../src/lib/store";

describe("Score Breakdown Logic", () => {
  it("should calculate zero score correctly", () => {
    const initialState = {
      score: 0,
      hasTakenQuiz: false,
      checklistCompleted: 0,
      hasSimulated: false,
      problemsSolved: [],
    };
    const breakdown = getScoreBreakdown(initialState as unknown as StoreState);
    expect(breakdown.total).toBe(0);
    expect(breakdown.quiz).toBe(0);
    expect(breakdown.simulation).toBe(0);
  });

  it("should calculate full score correctly", () => {
    const fullState = {
      score: 100,
      hasTakenQuiz: true,
      checklistCompleted: 5,
      hasSimulated: true,
      problemsSolved: ["p1", "p2", "p3", "p4", "p5"],
    };
    const breakdown = getScoreBreakdown(fullState as unknown as StoreState);
    expect(breakdown.total).toBe(100);
    expect(breakdown.quiz).toBe(20);
    expect(breakdown.checklist).toBe(30);
    expect(breakdown.simulation).toBe(25);
    expect(breakdown.problems).toBe(25);
  });

  it("should respect caps on checklist and problems", () => {
    const overState = {
      score: 100,
      hasTakenQuiz: true,
      checklistCompleted: 10, // Should cap at 30 pts
      hasSimulated: true,
      problemsSolved: ["1", "2", "3", "4", "5", "6", "7"], // Should cap at 25 pts
    };
    const breakdown = getScoreBreakdown(overState as unknown as StoreState);
    expect(breakdown.checklist).toBe(30);
    expect(breakdown.problems).toBe(25);
  });
});
