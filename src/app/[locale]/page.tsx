'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const SERVICES = [
  { key: '1', icon: '📷' },
  { key: '2', icon: '📊' },
  { key: '3', icon: '⚙️' },
] as const;

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main>
      {/* Hero section */}
      <section className="max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
        {/* Left: text + CTA */}
        <div className="flex-1 space-y-6">
          <p className="text-sm font-semibold tracking-widest text-[var(--brand-accent)] uppercase">
            {t('heroEyebrow')}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--t-text)] leading-tight whitespace-pre-line">
            {t('heroTitle')}
          </h1>
          <p className="text-lg text-[var(--t-muted)]">{t('heroSubtitle')}</p>
          <Link
            href="/photography"
            className="inline-block bg-[var(--brand-accent)] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {t('heroCta')}
          </Link>
        </div>

        {/* Right: placeholder image block */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md aspect-[4/3] bg-[var(--t-surface)] border border-[var(--t-border)] rounded-2xl flex items-center justify-center text-[var(--t-muted)]">
            <span className="text-5xl">📷</span>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="bg-[var(--t-surface)] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[var(--t-text)] mb-10 text-center">
            {t('servicesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map(({ key, icon }) => (
              <div
                key={key}
                className="bg-[var(--t-bg)] border border-[var(--t-border)] rounded-xl p-6 space-y-3"
              >
                <span className="text-3xl">{icon}</span>
                <h3 className="text-lg font-semibold text-[var(--t-text)]">
                  {t(`service${key}Title`)}
                </h3>
                <p className="text-[var(--t-muted)] text-sm">{t(`service${key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
