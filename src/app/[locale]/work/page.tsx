import { useTranslations } from 'next-intl';

export default function WorkPage() {
  const t = useTranslations('nav');
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-[var(--t-text)]">
        {t('work')}
      </h1>
      <p className="mt-4 text-[var(--t-muted)]">Coming in Phase 2 (TinaCMS)</p>
    </div>
  );
}
