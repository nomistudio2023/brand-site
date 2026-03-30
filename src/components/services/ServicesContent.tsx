'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { services } from '@/data/services';

const SERVICE_ICONS: Record<string, string> = {
  photography: '📷',
  wordpress: '🌐',
  other: '⚙️',
};

export default function ServicesContent() {
  const t = useTranslations('services');

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold text-[var(--t-text)] mb-3">
          {t('title')}
        </h1>
        <p className="text-[var(--t-muted)] text-lg">{t('subtitle')}</p>
      </div>

      {/* Service cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[var(--t-surface)] border border-[var(--t-border)] rounded-xl p-6 flex flex-col"
          >
            <div className="text-3xl mb-3">{SERVICE_ICONS[service.id] ?? '✦'}</div>
            <h2 className="text-lg font-semibold text-[var(--t-text)] mb-2">
              {t(service.titleKey as Parameters<typeof t>[0])}
            </h2>
            <p className="text-sm text-[var(--t-muted)] leading-relaxed mb-4">
              {t(service.descKey as Parameters<typeof t>[0])}
            </p>
            <ul className="space-y-1.5 mb-6 flex-1">
              {service.featureKeys.map((key) => (
                <li key={key} className="flex items-start gap-2 text-sm text-[var(--t-text)]">
                  <span className="text-[var(--brand-accent)] mt-0.5">✓</span>
                  {t(key as Parameters<typeof t>[0])}
                </li>
              ))}
            </ul>
            <p className="text-sm font-semibold text-[var(--brand-accent)] mb-4">
              {t(service.priceKey as Parameters<typeof t>[0])}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link
          href="/contact"
          className="inline-block bg-[var(--brand-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          {t('ctaText')}
        </Link>
      </div>
    </section>
  );
}
