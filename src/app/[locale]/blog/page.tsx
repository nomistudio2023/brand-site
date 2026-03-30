import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import BlogList from '@/components/blog/BlogList';
import { getAllPosts } from '@/lib/blog';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogList posts={posts} />;
}
