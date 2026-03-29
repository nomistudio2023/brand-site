import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function ThankYouPage() {
  const t = await getTranslations('thankyou');
  const lineId = process.env.NEXT_PUBLIC_LINE_ID;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <main className="max-w-lg mx-auto px-4 py-24 text-center space-y-8">
      <div className="text-5xl">✅</div>
      <div>
        <h1 className="text-3xl font-bold text-[var(--t-text)] mb-3">{t('title')}</h1>
        <p className="text-[var(--t-muted)]">{t('subtitle')}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {lineId && (
          <a
            href={`https://line.me/ti/p/~${lineId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#06C755] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {t('lineButton')}
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="bg-[var(--brand-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {t('emailButton')}
          </a>
        )}
      </div>

      <Link
        href="/"
        className="inline-block text-sm text-[var(--t-muted)] hover:text-[var(--t-text)] underline"
      >
        {t('backHome')}
      </Link>
    </main>
  );
}
