import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Navbar } from '../src/components/layout/Navbar';
import { useStore } from '../src/lib/store';

// Mock dependencies
jest.mock('next/navigation', () => ({
  usePathname: () => '/solve',
}));

jest.mock('framer-motion', () => ({
  m: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  LazyMotion: ({ children }: any) => <>{children}</>,
  domAnimation: {},
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    useStore.setState({ score: 45, firstTimeVoter: true });
  });

  it('renders correctly with score and active path', () => {
    render(<Navbar />);
    
    // Check if the brand name renders
    expect(screen.getByText('Vote')).toBeInTheDocument();
    expect(screen.getByText('Smart')).toBeInTheDocument();
    
    // Check if "1st Timer" badge renders based on store
    expect(screen.getByText('1st Timer')).toBeInTheDocument();
    
    // Check if score is rendered
    expect(screen.getByText('45')).toBeInTheDocument();
  });
});
