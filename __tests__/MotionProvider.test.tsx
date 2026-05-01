import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  LazyMotion: ({ children }: any) => <>{children}</>,
  MotionConfig: ({ children }: any) => <>{children}</>,
  domAnimation: {},
}));

// Mock the useReducedMotion hook
jest.mock('../src/hooks/useReducedMotion', () => ({
  useReducedMotion: jest.fn(() => false),
}));

import { MotionProvider } from '../src/components/providers/MotionProvider';
import { useReducedMotion } from '../src/hooks/useReducedMotion';

const mockUseReducedMotion = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>;

describe('MotionProvider', () => {
  it('renders children correctly', () => {
    render(
      <MotionProvider>
        <div data-testid="child">Hello World</div>
      </MotionProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders without crashing when reduced motion is false', () => {
    mockUseReducedMotion.mockReturnValue(false);
    const { container } = render(
      <MotionProvider>
        <span>Content</span>
      </MotionProvider>
    );
    expect(container).toBeTruthy();
  });

  it('renders without crashing when reduced motion is true', () => {
    mockUseReducedMotion.mockReturnValue(true);
    const { container } = render(
      <MotionProvider>
        <span>Reduced Motion Content</span>
      </MotionProvider>
    );
    expect(container).toBeTruthy();
    expect(screen.getByText('Reduced Motion Content')).toBeInTheDocument();
  });
});
