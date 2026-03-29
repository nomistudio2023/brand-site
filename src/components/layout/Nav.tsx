'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link, usePathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

const NAV_LINKS = [
  { key: 'home' as const,        href: '/'            },
  { key: 'photography' as const, href: '/photography' },
  { key: 'work' as const,        href: '/work'        },
  { key: 'blog' as const,        href: '/blog'        },
  { key: 'services' as const,    href: '/services'    },
  { key: 'resources' as const,   href: '/resources'   },
  { key: 'about' as const,       href: '/about'       },
] as const;

const LOCALE_LABELS: Record<Locale, string> = {
  zh: 'ZH',
  en: 'EN',
  ja: 'JA',
};

export function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const { locale } = useParams<{ locale: Locale }>();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--t-border)] bg-[var(--t-bg)]/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-bold text-[var(--t-text)]">
          Nomisas
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors hover:text-[var(--brand-accent)] ${
                  pathname === href
                    ? 'text-[var(--brand-accent)]'
                    : 'text-[var(--t-muted)]'
                }`}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Locale switcher */}
        <div className="flex items-center gap-1">
          {routing.locales.map((loc) => (
            <Link
              key={loc}
              href={pathname}
              locale={loc}
              aria-current={loc === locale ? 'true' : undefined}
              className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                loc === locale
                  ? 'bg-[var(--brand-accent)] text-white'
                  : 'text-[var(--t-muted)] hover:text-[var(--t-text)]'
              }`}
            >
              {LOCALE_LABELS[loc]}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
