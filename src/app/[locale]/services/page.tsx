import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ServicesContent from '@/components/services/ServicesContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default function ServicesPage() {
  return <ServicesContent />;
}
