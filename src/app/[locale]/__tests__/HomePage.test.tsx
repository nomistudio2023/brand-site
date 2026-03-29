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

import HomePage from '../page';

describe('HomePage', () => {
  it('renders hero eyebrow text', () => {
    render(<HomePage />);
    expect(screen.getByText('heroEyebrow')).toBeInTheDocument();
  });

  it('renders hero CTA link to photography', () => {
    render(<HomePage />);
    const link = screen.getByRole('link', { name: 'heroCta' });
    expect(link).toHaveAttribute('href', '/photography');
  });

  it('renders 3 service cards', () => {
    render(<HomePage />);
    expect(screen.getByText('service1Title')).toBeInTheDocument();
    expect(screen.getByText('service2Title')).toBeInTheDocument();
    expect(screen.getByText('service3Title')).toBeInTheDocument();
  });

  it('renders services section title', () => {
    render(<HomePage />);
    expect(screen.getByText('servicesTitle')).toBeInTheDocument();
  });
});
