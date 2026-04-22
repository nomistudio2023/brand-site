'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { PostMeta } from '@/lib/blog';

interface BlogListProps {
  posts: PostMeta[];
}

export default function BlogList({ posts }: BlogListProps) {
  const t = useTranslations('blog');

  if (posts.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-[var(--t-muted)]">{t('noPosts')}</p>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-[var(--t-text)] mb-3">
          {t('title')}
        </h1>
        <p className="text-[var(--t-muted)] text-lg">{t('subtitle')}</p>
      </div>

      {/* Post list */}
      <div className="divide-y divide-[var(--t-border)]">
        {posts.map((post) => (
          <article key={post.slug} className="py-8 first:pt-0">
            <Link href={`/blog/${post.slug}`} className="group block">
              <time className="text-xs text-[var(--t-muted)] mb-2 block">{post.date}</time>
              <h2 className="text-xl font-semibold text-[var(--t-text)] group-hover:text-[var(--brand-accent)] transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-[var(--t-muted)] leading-relaxed mb-3">{post.excerpt}</p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[var(--t-surface)] border border-[var(--t-border)] text-[var(--t-muted)] px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
