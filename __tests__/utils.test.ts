import { cn } from '../src/lib/utils';

describe('cn() utility function', () => {
  it('should return an empty string when called with no arguments', () => {
    expect(cn()).toBe('');
  });

  it('should return a single class unchanged', () => {
    expect(cn('text-center')).toBe('text-center');
  });

  it('should merge multiple classes into a single string', () => {
    expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold');
  });

  it('should handle conditional classes correctly', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active');
  });

  it('should deduplicate conflicting Tailwind classes (last wins)', () => {
    // tailwind-merge should resolve conflicts — the last padding wins
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('should resolve conflicting text-size classes', () => {
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  it('should handle array and object inputs from clsx', () => {
    expect(cn(['text-red-500', 'font-bold'])).toBe('text-red-500 font-bold');
    expect(cn({ 'bg-blue-500': true, 'bg-red-500': false })).toBe('bg-blue-500');
  });

  it('should handle undefined and null gracefully', () => {
    expect(cn('text-sm', undefined, null, 'font-bold')).toBe('text-sm font-bold');
  });

  it('should merge classes with responsive prefixes correctly', () => {
    expect(cn('text-sm', 'md:text-lg')).toBe('text-sm md:text-lg');
  });
});
