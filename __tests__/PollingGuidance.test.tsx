import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Mock UI components
jest.mock('../src/components/ui/Card', () => ({
  Card: ({ children, className }: any) => <div className={className}>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardHeader: ({ children }: any) => <div>{children}</div>,
  CardTitle: ({ children }: any) => <h3>{children}</h3>,
}));

jest.mock('../src/components/ui/Button', () => ({
  Button: ({ children, className }: any) => <button className={className}>{children}</button>,
}));

import PollingGuidance from '../src/components/features/PollingGuidance';

describe('PollingGuidance Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<PollingGuidance />);
    expect(container).toBeTruthy();
  });

  it('renders the Polling Guidance heading', () => {
    render(<PollingGuidance />);
    expect(screen.getByText(/Polling Guidance/i)).toBeInTheDocument();
  });

  it('renders all four time slot options', () => {
    render(<PollingGuidance />);
    expect(screen.getByText('7–9 AM')).toBeInTheDocument();
    expect(screen.getByText('12–3 PM')).toBeInTheDocument();
    expect(screen.getByText('9 AM–12')).toBeInTheDocument();
    expect(screen.getByText('3–6 PM')).toBeInTheDocument();
  });

  it('renders the find polling booth button', () => {
    render(<PollingGuidance />);
    expect(screen.getByText(/Find My Polling Booth/i)).toBeInTheDocument();
  });

  it('renders the guidance link to /polling page', () => {
    render(<PollingGuidance />);
    expect(screen.getByRole('link', { name: /Full Guidance/i })).toHaveAttribute('href', '/polling');
  });

  it('renders the external ECI link with correct href', () => {
    render(<PollingGuidance />);
    const eciLink = screen.getByRole('link', { name: /Find My Polling Booth/i });
    expect(eciLink).toHaveAttribute('href', 'https://electoralsearch.eci.gov.in/');
    expect(eciLink).toHaveAttribute('target', '_blank');
  });

  it('shows low/medium/high crowd indicators', () => {
    render(<PollingGuidance />);
    expect(screen.getAllByText(/🟢/)).toHaveLength(2); // 2 low-crowd slots
    expect(screen.getByText(/🟡/)).toBeInTheDocument();
    expect(screen.getByText(/🔴/)).toBeInTheDocument();
  });
});
