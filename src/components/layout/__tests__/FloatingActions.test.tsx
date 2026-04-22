import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock next-intl useTranslations
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({
    line: 'LINE 加好友',
    scrollTop: '回頂部',
  }[key] ?? key),
}));

import { FloatingActions } from '../FloatingActions';

describe('FloatingActions', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  it('renders LINE add-friend link', () => {
    render(<FloatingActions />);
    const link = screen.getByLabelText('LINE 加好友');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('does NOT show scroll-to-top at page top', () => {
    render(<FloatingActions />);
    expect(screen.queryByLabelText('回頂部')).not.toBeInTheDocument();
  });

  it('shows scroll-to-top button after scrolling past 500px', async () => {
    render(<FloatingActions />);
    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 600 });
      fireEvent.scroll(window);
    });
    expect(screen.getByLabelText('回頂部')).toBeInTheDocument();
  });

  it('LINE link uses NEXT_PUBLIC_LINE_ID env variable', () => {
    vi.stubEnv('NEXT_PUBLIC_LINE_ID', 'testid123');
    render(<FloatingActions />);
    const link = screen.getByLabelText('LINE 加好友');
    expect(link).toHaveAttribute('href', 'https://line.me/ti/p/~testid123');
  });
});
