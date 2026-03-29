# Brand-Site Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add SEO metadata to all pages, GalleryGrid empty state, About timeline i18n, and Dark mode toggle UI.

**Architecture:** Built on top of Phase 2 shell. Phase 2 is fully committed and passing (31/31 tests, 31 static pages). All changes follow existing patterns: `'use client'` for interactive components, `getTranslations` (async) for Server Components, `useTranslations` (sync) for Client Components, CSS tokens via `var(--t-*)` / `var(--brand-*)`.

**Tech Stack:** Next.js 16.2.1, next-intl v4, Tailwind CSS 4, Vitest + @testing-library/react

---

## Codebase Context (read before starting)

**Working directory:** `/workspace` (remote clone of brand-site repo)

**Key files:**
- `messages/zh.json`, `messages/en.json`, `messages/ja.json` — translation files
- `src/app/[locale]/page.tsx` — home page (`'use client'`, uses `useTranslations('home')`)
- `src/app/[locale]/photography/page.tsx` — photography page (async Server Component)
- `src/app/[locale]/about/page.tsx` — about page (Server Component wrapping `AboutContent`)
- `src/app/[locale]/contact/page.tsx` — contact page (Server Component wrapping `ContactForm`)
- `src/app/[locale]/thank-you/page.tsx` — thank-you page (async Server Component)
- `src/components/about/AboutContent.tsx` — `'use client'`, has hardcoded `TIMELINE` array
- `src/components/photography/GalleryGrid.tsx` — `'use client'`, no empty state
- `src/components/layout/Nav.tsx` — has `NAV_LINKS`, `useTranslations('nav')`, no dark mode toggle

**Design tokens (in `src/styles/tokens.css`):**
- `--brand-primary: #1a1a2e`, `--brand-accent: #e94560`
- `--t-bg`, `--t-surface`, `--t-border`, `--t-text`, `--t-muted`
- `[data-theme="dark"]` overrides already defined — dark mode tokens ready

**Test pattern:**
```typescript
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  getTranslations: () => async (key: string) => key,
}));
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, className }: any) => <a href={href} className={className}>{children}</a>,
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/',
}));
```

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `messages/zh.json` | Modify | Add SEO, timeline, dark mode, empty state keys |
| `messages/en.json` | Modify | Same, English |
| `messages/ja.json` | Modify | Same, Japanese |
| `src/components/photography/GalleryGrid.tsx` | Modify | Add empty state |
| `src/components/photography/__tests__/GalleryGrid.test.tsx` | Modify | Add empty state test |
| `src/components/about/AboutContent.tsx` | Modify | Use translated timeline keys |
| `src/components/about/__tests__/AboutContent.test.tsx` | Modify | Add timeline i18n test |
| `src/components/layout/ThemeToggle.tsx` | Create | Dark mode toggle button (`'use client'`) |
| `src/components/layout/__tests__/ThemeToggle.test.tsx` | Create | Tests for theme toggle |
| `src/components/layout/Nav.tsx` | Modify | Add `<ThemeToggle />` |
| `src/components/layout/__tests__/Nav.test.tsx` | Modify | Add ThemeToggle render test |
| `src/components/home/HomeContent.tsx` | Create | Extract home page UI to Client Component |
| `src/app/[locale]/page.tsx` | Modify | Convert to Server Component + `generateMetadata` |
| `src/app/[locale]/photography/page.tsx` | Modify | Add `generateMetadata` |
| `src/app/[locale]/about/page.tsx` | Modify | Add `generateMetadata` |
| `src/app/[locale]/contact/page.tsx` | Modify | Add `generateMetadata` |

---

### Task 1: Phase 3 Translation Keys

**Files:**
- Modify: `messages/zh.json`
- Modify: `messages/en.json`
- Modify: `messages/ja.json`

Read each file first. Add the following keys to each file (merge into existing namespaces — do NOT remove existing keys):

- [ ] **Step 1: Add keys to `messages/zh.json`**

Add to the `"home"` object:
```json
"metaTitle": "Nomisas | 攝影 × 行銷 × 自動化",
"metaDescription": "攝影師、數位行銷與自動化專家。用影像說故事，用技術創造品牌價值。"
```

Add to the `"photography"` object:
```json
"metaTitle": "攝影作品 | Nomisas",
"metaDescription": "商業攝影、風景、人像攝影作品集。",
"noPhotos": "此類別目前沒有作品"
```

Add to the `"about"` object:
```json
"metaTitle": "關於我 | Nomisas",
"metaDescription": "攝影師 × 數位行銷 × 自動化。了解 Nomisas 的背景與專業技能。",
"exp1Year": "2023",
"exp1Role": "自由攝影師",
"exp1Company": "自營",
"exp2Year": "2021",
"exp2Role": "數位行銷專員",
"exp2Company": "",
"exp3Year": "2018",
"exp3Role": "Web 開發者",
"exp3Company": ""
```

Add to the `"contact"` object:
```json
"metaTitle": "聯絡我 | Nomisas",
"metaDescription": "有攝影、行銷或自動化的合作需求？填寫表單，我會盡快回覆。"
```

Add to the `"nav"` object:
```json
"toggleDark": "切換深色模式",
"toggleLight": "切換淺色模式"
```

- [ ] **Step 2: Add same structure to `messages/en.json`**

Add to `"home"`:
```json
"metaTitle": "Nomisas | Photography × Marketing × Automation",
"metaDescription": "Photographer, digital marketer, and automation specialist. Visual storytelling powered by technology."
```

Add to `"photography"`:
```json
"metaTitle": "Photography | Nomisas",
"metaDescription": "Commercial photography, landscapes, and portrait portfolio.",
"noPhotos": "No photos in this category yet"
```

Add to `"about"`:
```json
"metaTitle": "About | Nomisas",
"metaDescription": "Photographer × Digital Marketer × Automation. Learn about Nomisas's background and skills.",
"exp1Year": "2023",
"exp1Role": "Freelance Photographer",
"exp1Company": "Self-employed",
"exp2Year": "2021",
"exp2Role": "Digital Marketing Specialist",
"exp2Company": "",
"exp3Year": "2018",
"exp3Role": "Web Developer",
"exp3Company": ""
```

Add to `"contact"`:
```json
"metaTitle": "Contact | Nomisas",
"metaDescription": "Photography, marketing, or automation project? Fill out the form and I'll get back to you."
```

Add to `"nav"`:
```json
"toggleDark": "Toggle dark mode",
"toggleLight": "Toggle light mode"
```

- [ ] **Step 3: Add same structure to `messages/ja.json`**

Add to `"home"`:
```json
"metaTitle": "Nomisas | 写真 × マーケティング × 自動化",
"metaDescription": "フォトグラファー、デジタルマーケター、自動化エキスパート。映像で語り、技術で価値を創る。"
```

Add to `"photography"`:
```json
"metaTitle": "写真作品 | Nomisas",
"metaDescription": "商業撮影・風景・ポートレートのポートフォリオ。",
"noPhotos": "このカテゴリにはまだ作品がありません"
```

Add to `"about"`:
```json
"metaTitle": "プロフィール | Nomisas",
"metaDescription": "フォトグラファー × デジタルマーケター × 自動化。経歴とスキルをご紹介します。",
"exp1Year": "2023",
"exp1Role": "フリーランスフォトグラファー",
"exp1Company": "個人事業",
"exp2Year": "2021",
"exp2Role": "デジタルマーケティング担当",
"exp2Company": "",
"exp3Year": "2018",
"exp3Role": "Web開発者",
"exp3Company": ""
```

Add to `"contact"`:
```json
"metaTitle": "お問い合わせ | Nomisas",
"metaDescription": "撮影・マーケティング・自動化のご相談はこちら。お気軽にどうぞ。"
```

Add to `"nav"`:
```json
"toggleDark": "ダークモード切替",
"toggleLight": "ライトモード切替"
```

- [ ] **Step 4: Verify key consistency**

```bash
node -e "
const zh = require('./messages/zh.json');
const en = require('./messages/en.json');
const ja = require('./messages/ja.json');
const flatten = (obj, prefix='') => Object.keys(obj).reduce((acc, k) => {
  const key = prefix ? prefix+'.'+k : k;
  return typeof obj[k] === 'object' && !Array.isArray(obj[k])
    ? {...acc, ...flatten(obj[k], key)} : {...acc, [key]: true};
}, {});
const zhK = Object.keys(flatten(zh)).sort().join('\n');
const enK = Object.keys(flatten(en)).sort().join('\n');
const jaK = Object.keys(flatten(ja)).sort().join('\n');
console.log('ZH===EN:', zhK === enK);
console.log('ZH===JA:', zhK === jaK);
if (zhK !== enK) {
  const zhSet = new Set(Object.keys(flatten(zh)));
  const enSet = new Set(Object.keys(flatten(en)));
  console.log('Missing in EN:', [...zhSet].filter(k => !enSet.has(k)));
  console.log('Extra in EN:', [...enSet].filter(k => !zhSet.has(k)));
}
"
```
Expected: `ZH===EN: true`, `ZH===JA: true`

- [ ] **Step 5: Commit**

```bash
git add messages/
git commit -m "feat(phase3): add SEO, timeline, dark mode, empty state translation keys"
```

---

### Task 2: GalleryGrid Empty State

**Files:**
- Modify: `src/components/photography/GalleryGrid.tsx`
- Modify: `src/components/photography/__tests__/GalleryGrid.test.tsx`

- [ ] **Step 1: Read `src/components/photography/GalleryGrid.tsx`**

- [ ] **Step 2: Add failing test**

Add to `src/components/photography/__tests__/GalleryGrid.test.tsx` — add this test inside the existing `describe('GalleryGrid', ...)` block:

```typescript
it('shows empty state message when no photos match category', () => {
  const landscapeOnly: Photo[] = [
    { id: '1', src: '/photos/placeholder.jpg', alt: 'Landscape', category: 'landscape', title: 'Mountain View' },
  ];
  render(<GalleryGrid photos={landscapeOnly} />);
  fireEvent.click(screen.getByRole('button', { name: 'portrait' }));
  expect(screen.getByText('noPhotos')).toBeInTheDocument();
});
```

- [ ] **Step 3: Run test (expect fail)**

```bash
npx vitest run src/components/photography/__tests__/GalleryGrid.test.tsx 2>&1 | tail -15
```

- [ ] **Step 4: Update `GalleryGrid.tsx` — add empty state**

After the category tabs and before the grid, add the conditional empty state. Find the `{/* Photo grid */}` comment section and replace the entire grid section with:

```tsx
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
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <span className="text-white text-sm font-medium">{photo.title}</span>
        </div>
      </div>
    ))}
  </div>
)}
```

- [ ] **Step 5: Run tests (expect 6 pass)**

```bash
npx vitest run src/components/photography/__tests__/GalleryGrid.test.tsx 2>&1 | tail -15
```

- [ ] **Step 6: Commit**

```bash
git add src/components/photography/
git commit -m "feat(phase3): add GalleryGrid empty state"
```

---

### Task 3: About Timeline i18n

**Files:**
- Modify: `src/components/about/AboutContent.tsx`
- Modify: `src/components/about/__tests__/AboutContent.test.tsx`

- [ ] **Step 1: Read `src/components/about/AboutContent.tsx`**

Find the `TIMELINE` array (currently hardcoded English strings).

- [ ] **Step 2: Add failing test**

Add to `src/components/about/__tests__/AboutContent.test.tsx` inside the existing describe block:

```typescript
it('renders timeline using translated keys', () => {
  render(<AboutContent />);
  // With mock returning key as value, exp1Role key becomes the text
  expect(screen.getByText('exp1Role')).toBeInTheDocument();
  expect(screen.getByText('exp2Role')).toBeInTheDocument();
  expect(screen.getByText('exp3Role')).toBeInTheDocument();
});
```

- [ ] **Step 3: Run test (expect fail)**

```bash
npx vitest run src/components/about/__tests__/AboutContent.test.tsx 2>&1 | tail -15
```

- [ ] **Step 4: Update `AboutContent.tsx` — replace TIMELINE with translation keys**

Remove the static `TIMELINE` array and `TimelineEntry` interface. Replace the timeline rendering section with translation-based entries.

The new timeline data is defined as a constant array of key suffixes:

```typescript
const TIMELINE_KEYS = ['1', '2', '3'] as const;
```

Replace the TIMELINE rendering section (find `{TIMELINE.map(...)`) with:

```tsx
{TIMELINE_KEYS.map((n) => {
  const role = t(`exp${n}Role`);
  const year = t(`exp${n}Year`);
  const company = t(`exp${n}Company`);
  return (
    <div key={n} className="flex items-start gap-3">
      <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[var(--brand-accent)] flex-shrink-0" />
      <div>
        <p className="text-sm font-medium text-[var(--t-text)]">{role}</p>
        <p className="text-xs text-[var(--t-muted)]">
          {year}{company ? ` — ${company}` : ''}
        </p>
      </div>
    </div>
  );
})}
```

- [ ] **Step 5: Run tests (expect all pass)**

```bash
npx vitest run src/components/about/__tests__/AboutContent.test.tsx 2>&1 | tail -15
```

- [ ] **Step 6: Commit**

```bash
git add src/components/about/
git commit -m "feat(phase3): make About timeline translatable"
```

---

### Task 4: Dark Mode Toggle UI

**Files:**
- Create: `src/components/layout/ThemeToggle.tsx`
- Create: `src/components/layout/__tests__/ThemeToggle.test.tsx`
- Modify: `src/components/layout/Nav.tsx`
- Modify: `src/components/layout/__tests__/Nav.test.tsx`

The dark mode toggle sets `data-theme="dark"` on `document.documentElement` (the `<html>` element). The `[data-theme="dark"]` CSS overrides are already defined in `src/styles/tokens.css`.

- [ ] **Step 1: Write the failing test**

Create `src/components/layout/__tests__/ThemeToggle.test.tsx`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import ThemeToggle from '../ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders the toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('sets data-theme="dark" on html element when clicked', () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('removes data-theme when clicked again (toggle back to light)', () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test (expect fail)**

```bash
npx vitest run src/components/layout/__tests__/ThemeToggle.test.tsx 2>&1 | tail -15
```

- [ ] **Step 3: Create `src/components/layout/ThemeToggle.tsx`**

```tsx
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
```

- [ ] **Step 4: Run ThemeToggle tests (expect 3 pass)**

```bash
npx vitest run src/components/layout/__tests__/ThemeToggle.test.tsx 2>&1 | tail -15
```

If tests fail due to `useEffect` not running in jsdom, update the toggle logic: instead of relying on `useEffect` for initial state, test 2 and 3 rely on clicking. Ensure the initial `isDark` state is `false` and the click handler directly sets `data-theme` on `document.documentElement`. The current implementation should work — jsdom supports `document.documentElement.setAttribute`.

- [ ] **Step 5: Read `src/components/layout/Nav.tsx` and add `<ThemeToggle />`**

Import `ThemeToggle` and add it into the Nav JSX, next to the locale switcher buttons. Do not change any other part of Nav.

```tsx
import ThemeToggle from './ThemeToggle';
```

Place `<ThemeToggle />` near the end of the nav actions area, alongside the locale buttons.

- [ ] **Step 6: Add Nav test for ThemeToggle**

Read `src/components/layout/__tests__/Nav.test.tsx`. Add a test:

```typescript
it('renders the theme toggle button', () => {
  render(<Nav />);
  // ThemeToggle renders a button with emoji content
  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toBeGreaterThan(0);
});
```

- [ ] **Step 7: Run all layout tests**

```bash
npx vitest run src/components/layout/ 2>&1 | tail -20
```

- [ ] **Step 8: Commit**

```bash
git add src/components/layout/
git commit -m "feat(phase3): add dark mode toggle to Nav"
```

---

### Task 5: SEO Metadata for All Pages

**Files:**
- Create: `src/components/home/HomeContent.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/app/[locale]/photography/page.tsx`
- Modify: `src/app/[locale]/about/page.tsx`
- Modify: `src/app/[locale]/contact/page.tsx`

In Next.js App Router, `generateMetadata` must be exported from a **Server Component** (not a `'use client'` component). The current home `page.tsx` is `'use client'`, so we must extract its UI into a separate client component.

- [ ] **Step 1: Create `src/components/home/HomeContent.tsx`**

Move all JSX from `src/app/[locale]/page.tsx` into this new file. The file should be identical to the current `page.tsx` content, but named `HomeContent` and exported as default. Keep `'use client'` at top.

Read `src/app/[locale]/page.tsx` first to get the exact content.

Create `src/components/home/HomeContent.tsx` with the exact same content as current `page.tsx`, but rename the default export from `HomePage` to `HomeContent`.

- [ ] **Step 2: Replace `src/app/[locale]/page.tsx` with Server Component + generateMetadata**

```tsx
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import HomeContent from '@/components/home/HomeContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default function HomePage() {
  return <HomeContent />;
}
```

- [ ] **Step 3: Update `src/app/[locale]/photography/page.tsx`** — add `generateMetadata`

Read the current file first. Add the metadata export:

```tsx
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import GalleryGrid from '@/components/photography/GalleryGrid';
import { photos } from '@/data/photos';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'photography' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function PhotographyPage() {
  const t = await getTranslations('photography');
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[var(--t-text)] mb-10">{t('title')}</h1>
      <GalleryGrid photos={photos} />
    </main>
  );
}
```

- [ ] **Step 4: Update `src/app/[locale]/about/page.tsx`** — add `generateMetadata`

```tsx
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
```

- [ ] **Step 5: Update `src/app/[locale]/contact/page.tsx`** — add `generateMetadata`

```tsx
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
```

- [ ] **Step 6: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Fix any errors before continuing.

- [ ] **Step 7: Run full test suite**

```bash
npx vitest run 2>&1 | tail -20
```

All tests must pass. If `HomePage.test.tsx` fails because the page no longer has direct content (it now renders `<HomeContent />`), update the test to import from `HomeContent` instead:

```typescript
import HomeContent from '@/components/home/HomeContent';
// render HomeContent instead of HomePage
```

- [ ] **Step 8: Commit**

```bash
git add src/components/home/ src/app/[locale]/
git commit -m "feat(phase3): add generateMetadata SEO to all pages"
```

---

### Task 6: Final Verification

- [ ] **Step 1: Run full test suite**

```bash
npx vitest run 2>&1 | tail -30
```

All tests must pass (count should be ≥ 31).

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Build check**

```bash
npx next build 2>&1 | tail -40
```

Expected: build succeeds. Report page count (should be ≥ 31).

- [ ] **Step 4: Fix any build errors**

If build fails, read the error and fix it. Commit the fix.

- [ ] **Step 5: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 6: Final commit message (if needed)**

If any fixes were applied during verification, commit:
```bash
git commit -m "fix(phase3): resolve build issues"
git push origin main
```

---

## Out of Scope (Phase 3)

- Real photos (swap placeholders in Phase 4)
- Services / Blog / Work page full content
- CMS integration
- Analytics / Vercel deployment setup
