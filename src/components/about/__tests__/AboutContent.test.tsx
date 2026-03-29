import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => (
    <img src={props.src as string} alt={props.alt as string} />
  ),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

import AboutContent from '../AboutContent';

describe('AboutContent', () => {
  it('renders the eyebrow text', () => {
    render(<AboutContent />);
    expect(screen.getByText('eyebrow')).toBeInTheDocument();
  });

  it('renders all 5 skill tags', () => {
    render(<AboutContent />);
    expect(screen.getByText('skill1')).toBeInTheDocument();
    expect(screen.getByText('skill2')).toBeInTheDocument();
    expect(screen.getByText('skill3')).toBeInTheDocument();
    expect(screen.getByText('skill4')).toBeInTheDocument();
    expect(screen.getByText('skill5')).toBeInTheDocument();
  });

  it('renders timeline entries', () => {
    render(<AboutContent />);
    expect(screen.getByText('experienceTitle')).toBeInTheDocument();
  });

  it('renders the CTA link to /contact', () => {
    render(<AboutContent />);
    const link = screen.getByRole('link', { name: 'ctaText' });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('renders the bio text', () => {
    render(<AboutContent />);
    expect(screen.getByText('bio')).toBeInTheDocument();
  });
});
