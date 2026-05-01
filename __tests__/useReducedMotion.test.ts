import { renderHook, act } from '@testing-library/react';
import { useReducedMotion } from '../src/hooks/useReducedMotion';

// Helper to mock window.matchMedia
function mockMatchMedia(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  const mockMql = {
    matches,
    addEventListener: jest.fn((_, cb) => listeners.push(cb)),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn(() => mockMql),
  });
  return { mockMql, triggerChange: (newMatches: boolean) => {
    listeners.forEach(cb => cb({ matches: newMatches } as MediaQueryListEvent));
  }};
}

describe('useReducedMotion hook', () => {
  it('should return false when prefers-reduced-motion is not set', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('should return true when prefers-reduced-motion: reduce is set', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('should update dynamically when the media query changes', () => {
    const { triggerChange } = mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);

    act(() => {
      triggerChange(true);
    });

    expect(result.current).toBe(true);
  });

  it('should clean up the event listener on unmount', () => {
    const { mockMql } = mockMatchMedia(false);
    const { unmount } = renderHook(() => useReducedMotion());
    unmount();
    expect(mockMql.removeEventListener).toHaveBeenCalledTimes(1);
  });
});
