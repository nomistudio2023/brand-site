import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default function ContactPage() {
  return <ContactForm />;
}
