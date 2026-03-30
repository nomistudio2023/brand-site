import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPost from '@/components/blog/BlogPost';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { routing } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const posts = getAllPosts();
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug);
  if (!post) return {};
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: `${post.title} | ${t('title')}`,
    description: post.excerpt,
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return <BlogPost post={post} />;
}
