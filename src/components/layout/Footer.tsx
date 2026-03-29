// Server Component — uses getTranslations (async), NOT useTranslations
import { getTranslations } from 'next-intl/server';

export async function Footer() {
  const t = await getTranslations('footer');
  return (
    <footer className="border-t border-[var(--t-border)] py-8 text-center text-sm text-[var(--t-muted)]">
      © {new Date().getFullYear()} Nomisas. {t('rights')}.
    </footer>
  );
}
