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

import ServicesContent from '../ServicesContent';

describe('ServicesContent', () => {
  it('renders the section title', () => {
    render(<ServicesContent />);
    expect(screen.getByText('title')).toBeInTheDocument();
  });

  it('renders all three service card titles', () => {
    render(<ServicesContent />);
    expect(screen.getByText('photography')).toBeInTheDocument();
    expect(screen.getByText('wordpress')).toBeInTheDocument();
    expect(screen.getByText('other')).toBeInTheDocument();
  });

  it('renders photography feature list items', () => {
    render(<ServicesContent />);
    expect(screen.getByText('photoFeature1')).toBeInTheDocument();
    expect(screen.getByText('photoFeature2')).toBeInTheDocument();
    expect(screen.getByText('photoFeature3')).toBeInTheDocument();
  });

  it('renders CTA link pointing to /contact', () => {
    render(<ServicesContent />);
    const links = screen.getAllByRole('link');
    expect(links.some(l => l.getAttribute('href') === '/contact')).toBe(true);
  });

  it('renders price for each service', () => {
    render(<ServicesContent />);
    expect(screen.getByText('photographyPrice')).toBeInTheDocument();
    expect(screen.getByText('wordpressPrice')).toBeInTheDocument();
    expect(screen.getByText('otherPrice')).toBeInTheDocument();
  });
});
