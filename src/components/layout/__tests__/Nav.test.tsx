import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Nav } from '../Nav';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    ({ home: '首頁', photography: '攝影作品', work: '專案案例',
       blog: '文章', services: '服務項目', resources: '工具資源',
       about: '關於我' }[key] ?? key),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
  usePathname: () => '/',
}));

vi.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'zh' }),
}));

describe('Nav', () => {
  it('renders all nav links', () => {
    render(<Nav />);
    expect(screen.getByText('首頁')).toBeInTheDocument();
    expect(screen.getByText('攝影作品')).toBeInTheDocument();
    expect(screen.getByText('文章')).toBeInTheDocument();
    expect(screen.getByText('服務項目')).toBeInTheDocument();
  });

  it('renders locale switcher with all 3 locales', () => {
    render(<Nav />);
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('JA')).toBeInTheDocument();
  });

  it('highlights current locale (zh) in switcher', () => {
    render(<Nav />);
    const zhButton = screen.getByText('ZH');
    expect(zhButton).toHaveAttribute('aria-current', 'true');
  });

  it('renders about nav link', () => {
    render(<Nav />);
    const aboutLink = screen.getByRole('link', { name: '關於我' });
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('renders the theme toggle button', () => {
    render(<Nav />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
