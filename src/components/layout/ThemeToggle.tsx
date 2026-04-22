'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function ThemeToggle() {
  const t = useTranslations('nav');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? t('toggleLight') : t('toggleDark')}
      className="p-2 rounded-lg text-[var(--t-muted)] hover:text-[var(--t-text)] hover:bg-[var(--t-surface)] transition-colors"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
