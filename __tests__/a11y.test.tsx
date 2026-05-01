/**
 * Automated Accessibility (a11y) Tests using jest-axe
 * Ensures all key components meet WCAG 2.1 AA standards.
 */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');
  const MOTION_PROPS = new Set([
    'initial', 'animate', 'exit', 'whileHover', 'whileTap', 'transition',
    'layout', 'layoutId', 'viewport', 'whileInView',
  ]);
  const mkEl = (tag: string) => ({ children, ...props }: any) => {
    const domProps: any = {};
    for (const key of Object.keys(props)) {
      if (!MOTION_PROPS.has(key)) domProps[key] = props[key];
    }
    return React.createElement(tag, domProps, children);
  };
  return {
    m: { div: mkEl('div'), button: mkEl('button'), span: mkEl('span'), p: mkEl('p'), h1: mkEl('h1') },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    LazyMotion: ({ children }: any) => <>{children}</>,
    MotionConfig: ({ children }: any) => <>{children}</>,
    domAnimation: {},
  };
});

jest.mock('next/link', () => ({ children, href }: any) => <a href={href}>{children}</a>);
jest.mock('next/navigation', () => ({ usePathname: () => '/' }));
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));
jest.mock('../src/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({ user: null, signOut: jest.fn(), loading: false, signInWithGoogle: jest.fn() })),
}));
jest.mock('../src/lib/analytics', () => ({
  trackEvent: jest.fn(),
  APP_EVENTS: { CHAT_QUERY: 'chat_query' },
}));
jest.mock('../src/components/ui/LoginModal', () => ({
  LoginModal: () => null,
}));

import { Footer } from '../src/components/layout/Footer';
import { Navbar } from '../src/components/layout/Navbar';
import { useStore } from '../src/lib/store';

describe('Accessibility (axe) — Core Components', () => {
  it('Footer has no accessibility violations', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Navbar (unauthenticated) has no accessibility violations', async () => {
    useStore.setState({ score: 0, firstTimeVoter: false });
    const { container } = render(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Navbar (first-time voter) has no accessibility violations', async () => {
    useStore.setState({ score: 50, firstTimeVoter: true });
    const { container } = render(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Accessibility (axe) — UI Primitives', () => {
  it('SocialIcons have no accessibility violations', async () => {
    const { GithubIcon, LinkedinIcon, InstagramIcon } = require('../src/components/ui/SocialIcons');
    const { container } = render(
      <div>
        <a href="https://github.com" aria-label="GitHub"><GithubIcon /></a>
        <a href="https://linkedin.com" aria-label="LinkedIn"><LinkedinIcon /></a>
        <a href="https://instagram.com" aria-label="Instagram"><InstagramIcon /></a>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
