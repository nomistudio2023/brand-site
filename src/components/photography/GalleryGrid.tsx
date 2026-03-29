'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Photo } from '@/data/photos';

type Category = 'all' | 'landscape' | 'portrait' | 'commercial';

const CATEGORIES: Category[] = ['all', 'landscape', 'portrait', 'commercial'];

interface GalleryGridProps {
  photos: Photo[];
}

export default function GalleryGrid({ photos }: GalleryGridProps) {
  const t = useTranslations('photography');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-[var(--brand-primary)] text-white'
                : 'bg-[var(--t-surface)] text-[var(--t-muted)] hover:text-[var(--t-text)]'
            }`}
          >
            {t(cat)}
          </button>
        ))}
      </div>

      {/* Photo grid or empty state */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[var(--t-muted)]">
          <p className="text-lg">{t('noPhotos')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((photo) => (
            <div key={photo.id} className="relative aspect-square overflow-hidden rounded-lg group">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-sm font-medium">{photo.title}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
