import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => <div data-testid="markdown">{children}</div>,
}));

vi.mock('remark-gfm', () => ({ default: () => {} }));

import BlogPost from '../BlogPost';
import type { BlogPost as BlogPostType } from '@/lib/blog';

const MOCK_POST: BlogPostType = {
  slug: 'test-post',
  title: 'Test Post Title',
  date: '2026-03-01',
  excerpt: 'Test excerpt.',
  tags: ['tag1', 'tag2'],
  content: '## Hello\nThis is content.',
};

describe('BlogPost', () => {
  it('renders the post title', () => {
    render(<BlogPost post={MOCK_POST} />);
    expect(screen.getByRole('heading', { name: 'Test Post Title' })).toBeInTheDocument();
  });

  it('renders the post date', () => {
    render(<BlogPost post={MOCK_POST} />);
    expect(screen.getByText('2026-03-01')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<BlogPost post={MOCK_POST} />);
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('renders back-to-blog link', () => {
    render(<BlogPost post={MOCK_POST} />);
    const backLink = screen.getByRole('link', { name: 'backToBlog' });
    expect(backLink.getAttribute('href')).toBe('/blog');
  });

  it('renders markdown content', () => {
    render(<BlogPost post={MOCK_POST} />);
    expect(screen.getByTestId('markdown')).toBeInTheDocument();
  });
});
