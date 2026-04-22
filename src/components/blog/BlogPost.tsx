'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { BlogPost as BlogPostType } from '@/lib/blog';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  const t = useTranslations('blog');

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="text-sm text-[var(--t-muted)] hover:text-[var(--t-text)] transition-colors mb-8 block"
      >
        {t('backToBlog')}
      </Link>

      {/* Post header */}
      <header className="mb-10">
        <time className="text-sm text-[var(--t-muted)] mb-3 block">{post.date}</time>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--t-text)] mb-4 leading-tight">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[var(--t-surface)] border border-[var(--t-border)] text-[var(--t-muted)] px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Divider */}
      <hr className="border-[var(--t-border)] mb-10" />

      {/* Markdown content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
