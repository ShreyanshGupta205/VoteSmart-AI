import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../src/components/ui/SocialIcons';

describe('SocialIcons Components', () => {
  describe('GithubIcon', () => {
    it('renders an SVG element', () => {
      const { container } = render(<GithubIcon />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<GithubIcon className="w-6 h-6 text-blue-500" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-6', 'h-6', 'text-blue-500');
    });
  });

  describe('LinkedinIcon', () => {
    it('renders an SVG element', () => {
      const { container } = render(<LinkedinIcon />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<LinkedinIcon className="text-blue-600" />);
      expect(container.querySelector('svg')).toHaveClass('text-blue-600');
    });
  });

  describe('InstagramIcon', () => {
    it('renders an SVG element', () => {
      const { container } = render(<InstagramIcon />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<InstagramIcon className="text-pink-500" />);
      expect(container.querySelector('svg')).toHaveClass('text-pink-500');
    });
  });
});
