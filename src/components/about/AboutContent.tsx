'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const SKILL_KEYS = ['skill1', 'skill2', 'skill3', 'skill4', 'skill5'] as const;

interface TimelineEntry {
  year: string;
  role: string;
  company?: string;
}

const TIMELINE: TimelineEntry[] = [
  { year: '2023', role: 'Freelance Photographer', company: 'Self-employed' },
  { year: '2021', role: 'Digital Marketing Manager' },
  { year: '2018', role: 'Web Developer' },
];

export default function AboutContent() {
  const t = useTranslations('about');
  const lineId = process.env.NEXT_PUBLIC_LINE_ID;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-[240px_1fr] gap-10">
        {/* Left column: photo + contact links */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="relative w-40 h-48 rounded-xl overflow-hidden bg-[var(--t-surface)]">
            <Image
              src="/photos/placeholder.jpg"
              alt="Profile photo"
              fill
              className="object-cover"
            />
          </div>
          {lineId && (
            <a
              href={`https://line.me/ti/p/~${lineId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--brand-accent)] hover:underline"
            >
              {t('lineLabel')}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-sm text-[var(--t-muted)] hover:text-[var(--t-text)]"
            >
              {t('emailLabel')}
            </a>
          )}
        </div>

        {/* Right column: bio + skills + timeline + CTA */}
        <div className="space-y-8">
          <div>
            <p className="text-sm font-semibold text-[var(--brand-accent)] tracking-widest uppercase mb-2">
              {t('eyebrow')}
            </p>
            <p className="text-[var(--t-muted)] leading-relaxed">{t('bio')}</p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-lg font-semibold text-[var(--t-text)] mb-3">{t('skillsTitle')}</h2>
            <div className="flex flex-wrap gap-2">
              {SKILL_KEYS.map((key) => (
                <span
                  key={key}
                  className="bg-[var(--t-surface)] border border-[var(--t-border)] text-[var(--t-text)] text-sm px-3 py-1 rounded-full"
                >
                  {t(key)}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h2 className="text-lg font-semibold text-[var(--t-text)] mb-3">{t('experienceTitle')}</h2>
            <div className="space-y-3">
              {TIMELINE.map((entry, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[var(--brand-accent)] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[var(--t-text)]">{entry.role}</p>
                    <p className="text-xs text-[var(--t-muted)]">
                      {entry.year}{entry.company ? ` — ${entry.company}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-block bg-[var(--brand-primary)] text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {t('ctaText')}
          </Link>
        </div>
      </div>
    </section>
  );
}
