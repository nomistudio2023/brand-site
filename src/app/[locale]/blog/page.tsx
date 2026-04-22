import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import BlogList from '@/components/blog/BlogList';
import { getAllPosts } from '@/lib/blog';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllPosts();
  return <BlogList posts={posts} />;
}
