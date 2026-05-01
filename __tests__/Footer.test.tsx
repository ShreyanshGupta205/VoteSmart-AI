import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock framer-motion with clean prop filtering
jest.mock('framer-motion', () => {
  const React = require('react');
  const MOTION_PROPS = new Set([
    'initial', 'animate', 'exit', 'whileHover', 'whileTap', 'whileFocus',
    'whileInView', 'transition', 'variants', 'layout', 'layoutId',
    'viewport', 'drag', 'dragConstraints',
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
    LazyMotion: ({ children }: any) => <>{children}</>,
    MotionConfig: ({ children }: any) => <>{children}</>,
    domAnimation: {},
  };
});

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

import { Footer } from '../src/components/layout/Footer';

describe('Footer Component', () => {
  it('renders the VoteSmart AI brand name', () => {
    render(<Footer />);
    expect(screen.getByText('VoteSmart AI')).toBeInTheDocument();
  });

  it('renders the educational disclaimer', () => {
    render(<Footer />);
    expect(screen.getByText(/educational platform/i)).toBeInTheDocument();
  });

  it('renders key navigation links', () => {
    render(<Footer />);
    // Check for critical legal links in the footer
    expect(screen.getByRole('link', { name: /privacy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /terms/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders social media links with correct hrefs', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const instagramLink = screen.getByRole('link', { name: /instagram/i });

    expect(githubLink).toHaveAttribute('href', 'https://github.com/ShreyanshGupta205');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/shreyanshgupta205/');
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/shreyanshg2005/');
  });

  it('renders social links with target="_blank" for security', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
