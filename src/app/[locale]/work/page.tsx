import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import WorkGrid from '@/components/work/WorkGrid';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'work' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WorkGrid />;
}
