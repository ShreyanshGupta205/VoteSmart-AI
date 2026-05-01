/**
 * Tests for analytics.ts — covers trackEvent behaviour and APP_EVENTS constants.
 * Firebase is mocked so no real network calls are made.
 */

// Mock firebase/analytics before importing anything
jest.mock('firebase/analytics', () => ({
  logEvent: jest.fn(),
}));

// Mock the firebase module to return a fake analytics object
jest.mock('../src/lib/firebase', () => ({
  analytics: { name: 'mock-analytics' },
}));

import { logEvent } from 'firebase/analytics';
import { trackEvent, APP_EVENTS } from '../src/lib/analytics';

const mockLogEvent = logEvent as jest.MockedFunction<typeof logEvent>;

describe('analytics — trackEvent()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls logEvent with the correct event name', () => {
    trackEvent('test_event');
    expect(mockLogEvent).toHaveBeenCalledTimes(1);
    expect(mockLogEvent).toHaveBeenCalledWith(
      { name: 'mock-analytics' },
      'test_event',
      undefined
    );
  });

  it('passes optional params to logEvent', () => {
    trackEvent('chat_query', { query: 'How to vote?', type: 'quick_action' });
    expect(mockLogEvent).toHaveBeenCalledWith(
      { name: 'mock-analytics' },
      'chat_query',
      { query: 'How to vote?', type: 'quick_action' }
    );
  });

  it('does not throw if logEvent throws internally', () => {
    mockLogEvent.mockImplementationOnce(() => { throw new Error('Firebase unavailable'); });
    expect(() => trackEvent('error_test')).not.toThrow();
  });
});

describe('analytics — APP_EVENTS constants', () => {
  it('has CHAT_QUERY event', () => {
    expect(APP_EVENTS.CHAT_QUERY).toBe('chat_query');
  });

  it('has all required civic events defined', () => {
    const required = [
      'CHAT_QUERY',
      'VOTER_SIMULATION_START',
      'VOTER_SIMULATION_COMPLETE',
      'READINESS_SCORE_VIEW',
      'LOGIN_SUCCESS',
      'SIGN_OUT',
    ];
    for (const key of required) {
      expect(APP_EVENTS).toHaveProperty(key);
      expect(typeof APP_EVENTS[key as keyof typeof APP_EVENTS]).toBe('string');
    }
  });

  it('has no empty string values', () => {
    for (const [key, value] of Object.entries(APP_EVENTS)) {
      expect(value.length).toBeGreaterThan(0);
      expect(value).not.toBe('');
    }
  });
});
