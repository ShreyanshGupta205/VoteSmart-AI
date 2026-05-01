import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import AssistantPage from '../src/app/assistant/page';
import { useChat } from '@ai-sdk/react';

// Mock AI SDK
jest.mock('@ai-sdk/react', () => ({
  useChat: jest.fn(),
}));

// Mock Framer Motion — filters out motion-specific props so DOM elements stay clean
jest.mock('framer-motion', () => {
  const React = require('react');
  // Props that framer-motion uses but are not valid HTML attributes
  const MOTION_PROPS = new Set([
    'initial', 'animate', 'exit', 'whileHover', 'whileTap', 'whileFocus',
    'whileInView', 'transition', 'variants', 'layout', 'layoutId',
    'viewport', 'drag', 'dragConstraints', 'onDragEnd', 'onAnimationComplete',
  ]);

  const mockComponent = (tag: string) => {
    const Component = ({ children, ...props }: any) => {
      const domProps: any = {};
      for (const key of Object.keys(props)) {
        if (!MOTION_PROPS.has(key)) domProps[key] = props[key];
      }
      return React.createElement(tag, domProps, children);
    };
    Component.displayName = `mock-${tag}`;
    return Component;
  };

  return {
    m: {
      div: mockComponent('div'),
      button: mockComponent('button'),
      h1: mockComponent('h1'),
      p: mockComponent('p'),
      span: mockComponent('span'),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    LazyMotion: ({ children }: any) => <>{children}</>,
    MotionConfig: ({ children }: any) => <>{children}</>,
    domAnimation: {},
  };
});


// Mock Analytics
jest.mock('../src/lib/analytics', () => ({
  trackEvent: jest.fn(),
  APP_EVENTS: { CHAT_QUERY: 'chat_query' },
}));

describe('AssistantPage', () => {
  const mockSendMessage = jest.fn();
  const mockSetMessages = jest.fn();

  beforeEach(() => {
    (useChat as jest.Mock).mockReturnValue({
      messages: [
        { id: '1', role: 'assistant', parts: [{ type: 'text', text: 'Hello!' }] },
      ],
      setMessages: mockSetMessages,
      sendMessage: mockSendMessage,
      status: 'idle',
    });
  });

  it('renders initial messages correctly', () => {
    render(<AssistantPage />);
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('Civic')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask anything about voting...')).toBeInTheDocument();
  });

  it('handles input submission', async () => {
    render(<AssistantPage />);
    const input = screen.getByPlaceholderText('Ask anything about voting...');
    const form = screen.getByLabelText('Chat input field').closest('form');

    fireEvent.change(input, { target: { value: 'How to vote?' } });
    fireEvent.submit(form!);

    expect(mockSendMessage).toHaveBeenCalledWith({ text: 'How to vote?' });
  });

  it('shows loading state', () => {
    (useChat as jest.Mock).mockReturnValue({
      messages: [],
      status: 'streaming',
    });
    render(<AssistantPage />);
    // The loading dots/animation container
    expect(screen.getByLabelText('Chat input field')).toBeDisabled();
  });
});
