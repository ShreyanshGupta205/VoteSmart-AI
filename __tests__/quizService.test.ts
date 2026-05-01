import { quizService, QuizQuestion } from '../src/services/quizService';

describe('quizService', () => {
  describe('getQuestions()', () => {
    it('returns an array of questions', () => {
      const questions = quizService.getQuestions();
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeGreaterThan(0);
    });

    it('each question has required fields', () => {
      const questions = quizService.getQuestions();
      for (const q of questions) {
        expect(q).toHaveProperty('id');
        expect(q).toHaveProperty('question');
        expect(q).toHaveProperty('options');
        expect(q).toHaveProperty('correct');
        expect(q).toHaveProperty('explanation');
      }
    });

    it('each question has at least 2 options', () => {
      const questions = quizService.getQuestions();
      for (const q of questions) {
        expect(q.options.length).toBeGreaterThanOrEqual(2);
      }
    });

    it('correct index is within options bounds', () => {
      const questions = quizService.getQuestions();
      for (const q of questions) {
        expect(q.correct).toBeGreaterThanOrEqual(0);
        expect(q.correct).toBeLessThan(q.options.length);
      }
    });
  });

  describe('getQuestionById()', () => {
    it('returns the correct question for a valid ID', () => {
      const question: QuizQuestion | undefined = quizService.getQuestionById(1);
      expect(question).toBeDefined();
      expect(question?.id).toBe(1);
      expect(question?.question).toBe('What is the minimum voting age in India?');
    });

    it('returns undefined for an invalid ID', () => {
      const question = quizService.getQuestionById(9999);
      expect(question).toBeUndefined();
    });

    it('returns correct answer index for the first question', () => {
      const q = quizService.getQuestionById(1);
      // 18 years is at index 0
      expect(q?.correct).toBe(0);
      expect(q?.options[q.correct]).toBe('18 years');
    });

    it('returns correct VVPAT question', () => {
      const q = quizService.getQuestionById(2);
      expect(q?.correct).toBe(1);
      expect(q?.options[q.correct]).toContain('Voter Verifiable');
    });
  });
});
