'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { workItems, type WorkCategory } from '@/data/work';

const CATEGORY_COLORS: Record<WorkCategory, string> = {
  photography: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  website: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  marketing: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
} satisfies Record<WorkCategory, string>;

export default function WorkGrid() {
  const t = useTranslations('work');

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold text-[var(--t-text)] mb-3">
          {t('title')}
        </h1>
        <p className="text-[var(--t-muted)] text-lg">{t('subtitle')}</p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workItems.map((item) => (
          <article
            key={item.id}
            className="bg-[var(--t-surface)] border border-[var(--t-border)] rounded-xl overflow-hidden"
          >
            <div className="relative aspect-[4/3] bg-[var(--t-border)]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[item.category]}`}>
                  {t(item.category)}
                </span>
                <span className="text-xs text-[var(--t-muted)]">{item.year}</span>
              </div>
              <h2 className="font-semibold text-[var(--t-text)] mb-1.5">{item.title}</h2>
              <p className="text-sm text-[var(--t-muted)] leading-relaxed">{item.description}</p>
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[var(--t-border)] text-[var(--t-muted)] px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
