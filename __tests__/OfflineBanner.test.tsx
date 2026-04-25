import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import OfflineBanner from '../src/components/ui/OfflineBanner';
import { useState, useEffect } from 'react';

// Mock React to simulate state changes if needed
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));

jest.mock('framer-motion', () => ({
  m: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  LazyMotion: ({ children }: any) => <>{children}</>,
  domAnimation: {},
}));

describe('OfflineBanner Component', () => {
  it('should not render anything when online', () => {
    (useState as jest.Mock).mockReturnValue([false, jest.fn()]);
    (useEffect as jest.Mock).mockImplementation((f) => f());

    const { container } = render(<OfflineBanner />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render the offline warning when offline', () => {
    (useState as jest.Mock).mockReturnValue([true, jest.fn()]);
    (useEffect as jest.Mock).mockImplementation((f) => f());

    render(<OfflineBanner />);
    expect(screen.getByText(/You are offline/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Assistant requires internet connection/i)).toBeInTheDocument();
  });
});
