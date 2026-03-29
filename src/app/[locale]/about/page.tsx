import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
