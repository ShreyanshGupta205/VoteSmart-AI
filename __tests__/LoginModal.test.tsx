import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginModal } from '../src/components/ui/LoginModal';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');
  const MOTION_PROPS = new Set([
    'initial', 'animate', 'exit', 'whileHover', 'whileTap', 'transition',
    'layout', 'layoutId', 'viewport', 'whileInView',
  ]);
  const mockDiv = ({ children, ...props }: any) => {
    const domProps: any = {};
    for (const key of Object.keys(props)) {
      if (!MOTION_PROPS.has(key)) domProps[key] = props[key];
    }
    return React.createElement('div', domProps, children);
  };
  return {
    m: { div: mockDiv },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    MotionConfig: ({ children }: any) => <>{children}</>,
    domAnimation: {},
  };
});

// Mock AuthContext
const mockSignInWithGoogle = jest.fn().mockResolvedValue(undefined);
jest.mock('../src/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    signInWithGoogle: mockSignInWithGoogle,
    loading: false,
  })),
}));

describe('LoginModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    render(<LoginModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Welcome to')).not.toBeInTheDocument();
  });

  it('renders the modal when isOpen is true', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
  });

  it('has correct aria attributes for accessibility', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'login-modal-title');
  });

  it('displays modal title correctly', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('VoteSmart AI')).toBeInTheDocument();
  });

  it('shows Google Sign-In button', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByRole('button', { name: /sign in with google/i })).toBeInTheDocument();
  });

  it('calls signInWithGoogle and onClose when Sign In button is clicked', async () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />);
    const signInBtn = screen.getByRole('button', { name: /sign in with google/i });
    fireEvent.click(signInBtn);
    await waitFor(() => expect(mockSignInWithGoogle).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });

  it('calls onClose when skip button is clicked', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />);
    const skipBtn = screen.getByRole('button', { name: /continue without signing in/i });
    fireEvent.click(skipBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />);
    // Backdrop is the first div with aria-hidden
    const backdrop = document.querySelector('[aria-hidden="true"]');
    if (backdrop) fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('shows privacy note', () => {
    render(<LoginModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText(/We only access your name and profile picture/i)).toBeInTheDocument();
  });
});
