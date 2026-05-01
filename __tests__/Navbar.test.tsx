import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../src/components/layout/Navbar';
import { useStore } from '../src/lib/store';

// --- Shared Mocks ---

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));
import { usePathname } from 'next/navigation';
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Clean framer-motion mock that strips motion props
jest.mock('framer-motion', () => {
  const React = require('react');
  const MOTION_PROPS = new Set(['initial', 'animate', 'exit', 'whileHover', 'whileTap', 'transition', 'layout', 'layoutId', 'viewport', 'whileInView']);
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

jest.mock('../src/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    user: null,
    signOut: jest.fn(),
    loading: false,
    signInWithGoogle: jest.fn(),
  })),
}));
import { useAuth } from '../src/context/AuthContext';
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

jest.mock('../src/components/ui/LoginModal', () => ({
  LoginModal: ({ isOpen }: any) =>
    isOpen ? <div data-testid="login-modal">Login Modal</div> : null,
}));

// --- Tests ---

describe('Navbar — Brand & Navigation', () => {
  beforeEach(() => {
    useStore.setState({ score: 45, firstTimeVoter: false });
    mockUsePathname.mockReturnValue('/');
  });

  it('renders brand name', () => {
    render(<Navbar />);
    expect(screen.getByText('Vote')).toBeInTheDocument();
    expect(screen.getByText('Smart')).toBeInTheDocument();
  });

  it('renders score from store', () => {
    render(<Navbar />);
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('renders "1st Timer" badge when firstTimeVoter is true', () => {
    useStore.setState({ firstTimeVoter: true });
    render(<Navbar />);
    expect(screen.getByText('1st Timer')).toBeInTheDocument();
  });

  it('does NOT render "1st Timer" badge when firstTimeVoter is false', () => {
    useStore.setState({ firstTimeVoter: false });
    render(<Navbar />);
    expect(screen.queryByText('1st Timer')).not.toBeInTheDocument();
  });

  it('shows nav links for all pages', () => {
    render(<Navbar />);
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AI Guide').length).toBeGreaterThan(0);
  });
});

describe('Navbar — Auth States', () => {
  beforeEach(() => {
    useStore.setState({ score: 0, firstTimeVoter: false });
  });

  it('shows Sign In button when no user is logged in', () => {
    mockUseAuth.mockReturnValue({ user: null, signOut: jest.fn(), loading: false, signInWithGoogle: jest.fn() });
    render(<Navbar />);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('opens login modal when Sign In is clicked', () => {
    mockUseAuth.mockReturnValue({ user: null, signOut: jest.fn(), loading: false, signInWithGoogle: jest.fn() });
    render(<Navbar />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByTestId('login-modal')).toBeInTheDocument();
  });

  it('shows user avatar when user is logged in', () => {
    mockUseAuth.mockReturnValue({
      user: { displayName: 'Shreyansh Gupta', photoURL: 'https://example.com/photo.jpg', email: '' } as any,
      signOut: jest.fn(),
      loading: false,
      signInWithGoogle: jest.fn(),
    });
    render(<Navbar />);
    const avatar = screen.getByAltText('Shreyansh Gupta');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('hides Sign In button when loading', () => {
    mockUseAuth.mockReturnValue({ user: null, signOut: jest.fn(), loading: true, signInWithGoogle: jest.fn() });
    render(<Navbar />);
    expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument();
  });
});

describe('Navbar — Mobile Menu', () => {
  beforeEach(() => {
    useStore.setState({ score: 50, firstTimeVoter: false });
    mockUseAuth.mockReturnValue({ user: null, signOut: jest.fn(), loading: false, signInWithGoogle: jest.fn() });
  });

  it('toggles mobile menu open on hamburger click', () => {
    render(<Navbar />);
    const menuBtn = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuBtn);
    // After opening: both the hamburger and the panel X button have 'Close menu' label
    const closeButtons = screen.getAllByRole('button', { name: /close menu/i });
    expect(closeButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('closes mobile menu when close button is clicked', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    // Click the first close button (could be hamburger or panel X)
    const closeButtons = screen.getAllByRole('button', { name: /close menu/i });
    fireEvent.click(closeButtons[0]);
    // Menu should be closed again — hamburger returns to 'Open menu'
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });
});
