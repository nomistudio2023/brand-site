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

import BlogList from '../BlogList';
import type { PostMeta } from '@/lib/blog';

const MOCK_POSTS: PostMeta[] = [
  {
    slug: 'post-one',
    title: 'First Post',
    date: '2026-03-01',
    excerpt: 'First post excerpt.',
    tags: ['tag1', 'tag2'],
  },
  {
    slug: 'post-two',
    title: 'Second Post',
    date: '2026-02-01',
    excerpt: 'Second post excerpt.',
    tags: ['tag3'],
  },
];

describe('BlogList', () => {
  it('renders all post titles', () => {
    render(<BlogList posts={MOCK_POSTS} />);
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });

  it('renders excerpt for each post', () => {
    render(<BlogList posts={MOCK_POSTS} />);
    expect(screen.getByText('First post excerpt.')).toBeInTheDocument();
  });

  it('renders link to each post', () => {
    render(<BlogList posts={MOCK_POSTS} />);
    const links = screen.getAllByRole('link');
    expect(links.some(l => l.getAttribute('href')?.includes('post-one'))).toBe(true);
  });

  it('renders tags for each post', () => {
    render(<BlogList posts={MOCK_POSTS} />);
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('renders empty state when no posts', () => {
    render(<BlogList posts={[]} />);
    expect(screen.getByText('noPosts')).toBeInTheDocument();
  });
});
