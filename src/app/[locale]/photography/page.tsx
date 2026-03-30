import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import GalleryGrid from '@/components/photography/GalleryGrid';
import { photos } from '@/data/photos';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'photography' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function PhotographyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'photography' });

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[var(--t-text)] mb-10">{t('title')}</h1>
      <GalleryGrid photos={photos} />
    </main>
  );
}
