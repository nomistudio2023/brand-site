import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'nav' });
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-[var(--t-text)]">
        {t('resources')}
      </h1>
      <p className="mt-4 text-[var(--t-muted)]">Coming in Phase 5 (Affiliate)</p>
    </div>
  );
}
