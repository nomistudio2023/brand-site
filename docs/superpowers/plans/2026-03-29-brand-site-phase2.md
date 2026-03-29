# Brand-Site Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the visual content layer of the brand site — enhanced home hero, photography gallery, about page, contact form, and thank-you page.

**Architecture:** Five pages built on top of the Phase 1 shell. New Client Components use `'use client'` + `useTranslations('namespace')`. New server pages use the existing `[locale]` layout. Contact form posts to Web3Forms (no backend required). All tests follow the existing Vitest + @testing-library/react + jsdom pattern.

**Tech Stack:** Next.js 16.2.1, next-intl v4, Tailwind CSS 4, Web3Forms, Vitest + @testing-library/react

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `messages/zh.json` | Modify | Add home/photography/about/contact/thankyou/nav keys |
| `messages/en.json` | Modify | Same, English |
| `messages/ja.json` | Modify | Same, Japanese |
| `src/data/photos.ts` | Create | Photo data shape + placeholder entries |
| `src/components/photography/GalleryGrid.tsx` | Create | Category tabs + filtered grid (`'use client'`) |
| `src/components/photography/__tests__/GalleryGrid.test.tsx` | Create | Tests for tab filtering + rendering |
| `src/app/[locale]/photography/page.tsx` | Modify | Replace stub with real gallery page |
| `src/app/[locale]/page.tsx` | Modify | Upgrade hero to split layout + services section |
| `src/components/about/AboutContent.tsx` | Create | Two-column about layout (`'use client'`) |
| `src/components/about/__tests__/AboutContent.test.tsx` | Create | Tests for skills + timeline rendering |
| `src/app/[locale]/about/page.tsx` | Create | About page route |
| `src/components/contact/ContactForm.tsx` | Create | Centered form + Web3Forms submit (`'use client'`) |
| `src/components/contact/__tests__/ContactForm.test.tsx` | Create | Tests for fields + error state |
| `src/app/[locale]/contact/page.tsx` | Create | Contact page route |
| `src/app/[locale]/thank-you/page.tsx` | Create | Thank-you page with LINE + Email links |
| `src/components/layout/Nav.tsx` | Modify | Add About link to NAV_LINKS |
| `src/components/layout/__tests__/Nav.test.tsx` | Modify | Add About link assertion |

---

### Task 1: Translation Keys

**Files:**
- Modify: `messages/zh.json`
- Modify: `messages/en.json`
- Modify: `messages/ja.json`

- [ ] **Step 1: Replace `messages/zh.json` with the full updated content**

```json
{
  "nav": {
    "home": "首頁",
    "photography": "攝影作品",
    "work": "專案案例",
    "blog": "文章",
    "services": "服務項目",
    "resources": "工具資源",
    "about": "關於我"
  },
  "footer": {
    "rights": "版權所有"
  },
  "floating": {
    "line": "LINE 加好友",
    "instagram": "Instagram",
    "scrollTop": "回頂部"
  },
  "home": {
    "heroEyebrow": "Photography × Marketing × Automation",
    "heroTitle": "用影像說故事\n用技術創造價值",
    "heroSubtitle": "攝影師 × 數位行銷 × 自動化",
    "heroCta": "查看作品",
    "servicesTitle": "我能為你做什麼",
    "service1Title": "攝影",
    "service1Desc": "商業攝影、活動紀錄、人像寫真",
    "service2Title": "數位行銷",
    "service2Desc": "品牌策略、社群經營、內容規劃",
    "service3Title": "自動化",
    "service3Desc": "工作流程優化、API 整合、工具建置"
  },
  "photography": {
    "title": "攝影作品",
    "all": "全部",
    "landscape": "風景",
    "portrait": "人像",
    "commercial": "商業"
  },
  "about": {
    "eyebrow": "攝影師 × 數位行銷 × 自動化",
    "bio": "熱愛用影像記錄生活與商業故事，同時透過數位行銷與自動化工具為品牌創造實質價值。歡迎找我聊聊你的下一個專案。",
    "skillsTitle": "專業技能",
    "skill1": "攝影",
    "skill2": "品牌識別",
    "skill3": "數位行銷",
    "skill4": "自動化",
    "skill5": "Web Dev",
    "experienceTitle": "經歷",
    "lineLabel": "LINE 聯繫",
    "emailLabel": "Email 聯繫",
    "ctaText": "想合作？聯絡我"
  },
  "contact": {
    "title": "聯絡我",
    "subtitle": "有專案想聊？填寫後我會盡快回覆",
    "namePlaceholder": "你的姓名",
    "emailPlaceholder": "Email",
    "serviceLabel": "服務類型",
    "servicePhotography": "攝影",
    "serviceMarketing": "數位行銷",
    "serviceAutomation": "自動化",
    "serviceOther": "其他",
    "messageLabel": "專案描述",
    "messagePlaceholder": "請簡單描述你的需求...",
    "budgetLabel": "預算範圍（選填）",
    "budgetUnknown": "不確定",
    "budgetUnder10k": "NT$10,000 以下",
    "budget10k30k": "NT$10,000–30,000",
    "budgetOver30k": "NT$30,000 以上",
    "submitButton": "送出",
    "submitting": "送出中...",
    "errorMessage": "送出失敗，請稍後再試或直接用 LINE 聯繫"
  },
  "thankyou": {
    "title": "感謝您的填寫！",
    "subtitle": "我將在 1–2 個工作日內回覆您",
    "lineButton": "加入 LINE 官方帳號",
    "emailButton": "Email 聯繫",
    "backHome": "回首頁"
  }
}
```

- [ ] **Step 2: Replace `messages/en.json` with the full updated content**

```json
{
  "nav": {
    "home": "Home",
    "photography": "Photography",
    "work": "Work",
    "blog": "Blog",
    "services": "Services",
    "resources": "Resources",
    "about": "About"
  },
  "footer": {
    "rights": "All rights reserved"
  },
  "floating": {
    "line": "Add on LINE",
    "instagram": "Instagram",
    "scrollTop": "Back to top"
  },
  "home": {
    "heroEyebrow": "Photography × Marketing × Automation",
    "heroTitle": "Visual storytelling\npowered by technology",
    "heroSubtitle": "Photographer × Digital Marketer × Automation",
    "heroCta": "View Work",
    "servicesTitle": "What I can do for you",
    "service1Title": "Photography",
    "service1Desc": "Commercial photography, events, portraits",
    "service2Title": "Digital Marketing",
    "service2Desc": "Brand strategy, social media, content planning",
    "service3Title": "Automation",
    "service3Desc": "Workflow optimization, API integration, tooling"
  },
  "photography": {
    "title": "Photography",
    "all": "All",
    "landscape": "Landscape",
    "portrait": "Portrait",
    "commercial": "Commercial"
  },
  "about": {
    "eyebrow": "Photographer × Digital Marketer × Automation",
    "bio": "I love capturing life and business stories through images, while creating real value for brands through digital marketing and automation tools. Let's talk about your next project.",
    "skillsTitle": "Skills",
    "skill1": "Photography",
    "skill2": "Brand Identity",
    "skill3": "Digital Marketing",
    "skill4": "Automation",
    "skill5": "Web Dev",
    "experienceTitle": "Experience",
    "lineLabel": "Contact via LINE",
    "emailLabel": "Contact via Email",
    "ctaText": "Want to collaborate? Contact me"
  },
  "contact": {
    "title": "Contact",
    "subtitle": "Have a project in mind? Fill out the form and I'll get back to you.",
    "namePlaceholder": "Your name",
    "emailPlaceholder": "Email",
    "serviceLabel": "Service type",
    "servicePhotography": "Photography",
    "serviceMarketing": "Digital Marketing",
    "serviceAutomation": "Automation",
    "serviceOther": "Other",
    "messageLabel": "Project description",
    "messagePlaceholder": "Briefly describe your needs...",
    "budgetLabel": "Budget range (optional)",
    "budgetUnknown": "Not sure",
    "budgetUnder10k": "Under NT$10,000",
    "budget10k30k": "NT$10,000–30,000",
    "budgetOver30k": "Over NT$30,000",
    "submitButton": "Send",
    "submitting": "Sending...",
    "errorMessage": "Failed to send. Please try again or contact via LINE."
  },
  "thankyou": {
    "title": "Thank you!",
    "subtitle": "I'll get back to you within 1–2 business days.",
    "lineButton": "Add LINE Official Account",
    "emailButton": "Contact via Email",
    "backHome": "Back to home"
  }
}
```

- [ ] **Step 3: Replace `messages/ja.json` with the full updated content**

```json
{
  "nav": {
    "home": "ホーム",
    "photography": "写真作品",
    "work": "制作実績",
    "blog": "ブログ",
    "services": "サービス",
    "resources": "リソース",
    "about": "プロフィール"
  },
  "footer": {
    "rights": "All rights reserved"
  },
  "floating": {
    "line": "LINEで友達追加",
    "instagram": "Instagram",
    "scrollTop": "トップへ戻る"
  },
  "home": {
    "heroEyebrow": "Photography × Marketing × Automation",
    "heroTitle": "映像で語り\n技術で価値を創る",
    "heroSubtitle": "フォトグラファー × デジタルマーケター × 自動化",
    "heroCta": "作品を見る",
    "servicesTitle": "できること",
    "service1Title": "写真撮影",
    "service1Desc": "商業撮影・イベント記録・ポートレート",
    "service2Title": "デジタルマーケティング",
    "service2Desc": "ブランド戦略・SNS運用・コンテンツ企画",
    "service3Title": "自動化",
    "service3Desc": "業務効率化・API連携・ツール開発"
  },
  "photography": {
    "title": "写真作品",
    "all": "すべて",
    "landscape": "風景",
    "portrait": "ポートレート",
    "commercial": "商業"
  },
  "about": {
    "eyebrow": "フォトグラファー × デジタルマーケター × 自動化",
    "bio": "映像で生活やビジネスのストーリーを記録し、デジタルマーケティングと自動化ツールでブランドに実質的な価値を提供しています。次のプロジェクトについてぜひご相談ください。",
    "skillsTitle": "スキル",
    "skill1": "写真撮影",
    "skill2": "ブランドアイデンティティ",
    "skill3": "デジタルマーケティング",
    "skill4": "自動化",
    "skill5": "Web開発",
    "experienceTitle": "経歴",
    "lineLabel": "LINEで連絡",
    "emailLabel": "Emailで連絡",
    "ctaText": "コラボしませんか？"
  },
  "contact": {
    "title": "お問い合わせ",
    "subtitle": "プロジェクトのご相談はこちらからどうぞ。",
    "namePlaceholder": "お名前",
    "emailPlaceholder": "メールアドレス",
    "serviceLabel": "サービス種別",
    "servicePhotography": "写真撮影",
    "serviceMarketing": "デジタルマーケティング",
    "serviceAutomation": "自動化",
    "serviceOther": "その他",
    "messageLabel": "プロジェクト概要",
    "messagePlaceholder": "ご要望を簡単にご記入ください...",
    "budgetLabel": "予算（任意）",
    "budgetUnknown": "未定",
    "budgetUnder10k": "NT$10,000未満",
    "budget10k30k": "NT$10,000–30,000",
    "budgetOver30k": "NT$30,000以上",
    "submitButton": "送信",
    "submitting": "送信中...",
    "errorMessage": "送信に失敗しました。後でもう一度お試しいただくか、LINEでご連絡ください。"
  },
  "thankyou": {
    "title": "ありがとうございます！",
    "subtitle": "1〜2営業日以内にご返信いたします。",
    "lineButton": "LINE公式アカウントを追加",
    "emailButton": "Emailで連絡",
    "backHome": "ホームへ戻る"
  }
}
```

- [ ] **Step 4: Verify the keys are consistent across all 3 files**

Run:
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
"
```
Expected output:
```
ZH===EN: true
ZH===JA: true
```

- [ ] **Step 5: Commit**

```bash
git add messages/
git commit -m "feat: add phase 2 translation keys (home/photography/about/contact/thankyou)"
```

---

### Task 2: Photo Data

**Files:**
- Create: `src/data/photos.ts`

- [ ] **Step 1: Write the failing test**

Create `src/data/__tests__/photos.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { photos, type Photo } from '../photos';

describe('photos data', () => {
  it('exports a non-empty array', () => {
    expect(photos.length).toBeGreaterThan(0);
  });

  it('every photo has required fields', () => {
    photos.forEach((p: Photo) => {
      expect(p.id).toBeTruthy();
      expect(p.src).toBeTruthy();
      expect(p.alt).toBeTruthy();
      expect(['landscape', 'portrait', 'commercial']).toContain(p.category);
      expect(p.title).toBeTruthy();
    });
  });

  it('all ids are unique', () => {
    const ids = photos.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/data/__tests__/photos.test.ts
```
Expected: FAIL — "Cannot find module '../photos'"

- [ ] **Step 3: Create `src/data/photos.ts`**

```typescript
export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: 'landscape' | 'portrait' | 'commercial';
  title: string;
}

export const photos: Photo[] = [
  {
    id: 'landscape-01',
    src: '/photos/placeholder.jpg',
    alt: 'Mountain sunrise',
    category: 'landscape',
    title: 'Mountain Sunrise',
  },
  {
    id: 'landscape-02',
    src: '/photos/placeholder.jpg',
    alt: 'Coastal view',
    category: 'landscape',
    title: 'Coastal View',
  },
  {
    id: 'landscape-03',
    src: '/photos/placeholder.jpg',
    alt: 'City skyline',
    category: 'landscape',
    title: 'City Skyline',
  },
  {
    id: 'portrait-01',
    src: '/photos/placeholder.jpg',
    alt: 'Portrait session',
    category: 'portrait',
    title: 'Portrait Session',
  },
  {
    id: 'portrait-02',
    src: '/photos/placeholder.jpg',
    alt: 'Corporate headshot',
    category: 'portrait',
    title: 'Corporate Headshot',
  },
  {
    id: 'commercial-01',
    src: '/photos/placeholder.jpg',
    alt: 'Product photography',
    category: 'commercial',
    title: 'Product Photography',
  },
  {
    id: 'commercial-02',
    src: '/photos/placeholder.jpg',
    alt: 'Brand shoot',
    category: 'commercial',
    title: 'Brand Shoot',
  },
  {
    id: 'commercial-03',
    src: '/photos/placeholder.jpg',
    alt: 'Food photography',
    category: 'commercial',
    title: 'Food Photography',
  },
  {
    id: 'portrait-03',
    src: '/photos/placeholder.jpg',
    alt: 'Family portrait',
    category: 'portrait',
    title: 'Family Portrait',
  },
];
```

- [ ] **Step 4: Create the placeholder image**

```bash
mkdir -p public/photos
curl -o public/photos/placeholder.jpg "https://via.placeholder.com/800x800/e5e7eb/9ca3af?text=Photo" 2>/dev/null || \
  node -e "
const fs = require('fs');
// Create a 1x1 gray JPEG as placeholder
const grayJpeg = Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=', 'base64');
fs.writeFileSync('public/photos/placeholder.jpg', grayJpeg);
console.log('placeholder.jpg created');
"
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run src/data/__tests__/photos.test.ts
```
Expected: PASS (3 tests)

- [ ] **Step 6: Commit**

```bash
git add src/data/ public/photos/
git commit -m "feat: add photo data interface and placeholder entries"
```

---

### Task 3: GalleryGrid Component

**Files:**
- Create: `src/components/photography/GalleryGrid.tsx`
- Create: `src/components/photography/__tests__/GalleryGrid.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/photography/__tests__/GalleryGrid.test.tsx`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    ({
      all: '全部',
      landscape: '風景',
      portrait: '人像',
      commercial: '商業',
    }[key] ?? key),
}));

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: { alt: string }) => <img alt={alt} {...props} />,
}));

import { GalleryGrid } from '../GalleryGrid';
import type { Photo } from '@/data/photos';

const mockPhotos: Photo[] = [
  { id: '1', src: '/a.jpg', alt: 'Landscape 1', category: 'landscape', title: 'L1' },
  { id: '2', src: '/b.jpg', alt: 'Portrait 1', category: 'portrait', title: 'P1' },
  { id: '3', src: '/c.jpg', alt: 'Commercial 1', category: 'commercial', title: 'C1' },
];

describe('GalleryGrid', () => {
  it('renders all photos by default (all tab active)', () => {
    render(<GalleryGrid photos={mockPhotos} />);
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });

  it('shows category tabs', () => {
    render(<GalleryGrid photos={mockPhotos} />);
    expect(screen.getByText('全部')).toBeInTheDocument();
    expect(screen.getByText('風景')).toBeInTheDocument();
    expect(screen.getByText('人像')).toBeInTheDocument();
    expect(screen.getByText('商業')).toBeInTheDocument();
  });

  it('filters to landscape photos when landscape tab clicked', () => {
    render(<GalleryGrid photos={mockPhotos} />);
    fireEvent.click(screen.getByText('風景'));
    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(screen.getByAltText('Landscape 1')).toBeInTheDocument();
  });

  it('filters to portrait photos when portrait tab clicked', () => {
    render(<GalleryGrid photos={mockPhotos} />);
    fireEvent.click(screen.getByText('人像'));
    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(screen.getByAltText('Portrait 1')).toBeInTheDocument();
  });

  it('shows all photos again when all tab clicked after filtering', () => {
    render(<GalleryGrid photos={mockPhotos} />);
    fireEvent.click(screen.getByText('風景'));
    fireEvent.click(screen.getByText('全部'));
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/photography/__tests__/GalleryGrid.test.tsx
```
Expected: FAIL — "Cannot find module '../GalleryGrid'"

- [ ] **Step 3: Create `src/components/photography/GalleryGrid.tsx`**

```typescript
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Photo } from '@/data/photos';

type Category = 'all' | 'landscape' | 'portrait' | 'commercial';

const CATEGORIES: Category[] = ['all', 'landscape', 'portrait', 'commercial'];

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const t = useTranslations('photography');
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? photos : photos.filter((p) => p.category === active);

  return (
    <div>
      {/* Category tabs */}
      <div className="mb-8 flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-[var(--t-radius-button)] text-sm font-medium transition-colors ${
              active === cat
                ? 'bg-[var(--brand-primary)] text-white'
                : 'bg-[var(--t-surface)] text-[var(--t-muted)] hover:text-[var(--t-text)]'
            }`}
          >
            {t(cat)}
          </button>
        ))}
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map((photo) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-[var(--t-radius-card)] bg-[var(--t-surface)]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="p-3 text-sm font-medium text-white">{photo.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/photography/__tests__/GalleryGrid.test.tsx
```
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/photography/
git commit -m "feat: add GalleryGrid component with category tab filtering"
```

---

### Task 4: Photography Page

**Files:**
- Modify: `src/app/[locale]/photography/page.tsx`

- [ ] **Step 1: Replace `src/app/[locale]/photography/page.tsx`**

```typescript
import { useTranslations } from 'next-intl';
import { GalleryGrid } from '@/components/photography/GalleryGrid';
import { photos } from '@/data/photos';

export default function PhotographyPage() {
  const t = useTranslations('photography');
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 font-display text-4xl font-bold text-[var(--t-text)]">
        {t('title')}
      </h1>
      <GalleryGrid photos={photos} />
    </div>
  );
}
```

- [ ] **Step 2: Run all tests to confirm nothing broke**

```bash
npx vitest run
```
Expected: All existing tests PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/\[locale\]/photography/page.tsx
git commit -m "feat: replace photography page stub with real gallery"
```

---

### Task 5: Home Hero Upgrade

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Create: `src/app/[locale]/__tests__/HomePage.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/app/[locale]/__tests__/HomePage.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

import HomePage from '../page';

describe('HomePage', () => {
  it('renders the hero eyebrow text', () => {
    render(<HomePage />);
    expect(screen.getByText('home.heroEyebrow')).toBeInTheDocument();
  });

  it('renders the hero CTA link pointing to /photography', () => {
    render(<HomePage />);
    const cta = screen.getByRole('link', { name: 'home.heroCta' });
    expect(cta).toHaveAttribute('href', '/photography');
  });

  it('renders 3 service cards', () => {
    render(<HomePage />);
    expect(screen.getByText('home.service1Title')).toBeInTheDocument();
    expect(screen.getByText('home.service2Title')).toBeInTheDocument();
    expect(screen.getByText('home.service3Title')).toBeInTheDocument();
  });

  it('renders services section title', () => {
    render(<HomePage />);
    expect(screen.getByText('home.servicesTitle')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run "src/app/\[locale\]/__tests__/HomePage.test.tsx"
```
Expected: FAIL — missing keys

- [ ] **Step 3: Replace `src/app/[locale]/page.tsx`**

```typescript
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const SERVICE_ICONS = ['📷', '📊', '⚙️'] as const;

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div>
      {/* ── Hero: split layout ── */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 py-20 md:flex-row md:py-28">
        {/* Left: text */}
        <div className="flex-1 text-center md:text-left">
          <p className="mb-3 text-sm font-semibold tracking-widest text-[var(--brand-accent)] uppercase">
            {t('heroEyebrow')}
          </p>
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-[var(--t-text)] md:text-5xl lg:text-6xl whitespace-pre-line">
            {t('heroTitle')}
          </h1>
          <p className="mb-8 text-lg text-[var(--t-muted)]">
            {t('heroSubtitle')}
          </p>
          <Link
            href="/photography"
            className="inline-block rounded-[var(--t-radius-button)] bg-[var(--brand-accent)] px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t('heroCta')}
          </Link>
        </div>

        {/* Right: hero image placeholder */}
        <div className="flex-1 w-full">
          <div className="aspect-[4/3] w-full rounded-[var(--t-radius-card)] bg-[var(--t-surface)] border border-[var(--t-border)] flex items-center justify-center">
            <span className="text-5xl">📷</span>
          </div>
        </div>
      </section>

      {/* ── Services section ── */}
      <section className="bg-[var(--t-surface)] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-[var(--t-text)]">
            {t('servicesTitle')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {([1, 2, 3] as const).map((n, i) => (
              <div
                key={n}
                className="rounded-[var(--t-radius-card)] border border-[var(--t-border)] bg-[var(--t-bg)] p-6"
              >
                <div className="mb-3 text-3xl">{SERVICE_ICONS[i]}</div>
                <h3 className="mb-2 font-display text-lg font-semibold text-[var(--t-text)]">
                  {t(`service${n}Title`)}
                </h3>
                <p className="text-sm text-[var(--t-muted)]">{t(`service${n}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run "src/app/\[locale\]/__tests__/HomePage.test.tsx"
```
Expected: PASS (4 tests)

- [ ] **Step 5: Run all tests**

```bash
npx vitest run
```
Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/app/\[locale\]/page.tsx src/app/\[locale\]/__tests__/
git commit -m "feat: upgrade home page to split hero + services section"
```

---

### Task 6: About Page

**Files:**
- Create: `src/components/about/AboutContent.tsx`
- Create: `src/components/about/__tests__/AboutContent.test.tsx`
- Create: `src/app/[locale]/about/page.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/about/__tests__/AboutContent.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => {
    const data: Record<string, string> = {
      eyebrow: 'Eyebrow text',
      bio: 'Bio text',
      skillsTitle: 'Skills',
      skill1: 'Photography',
      skill2: 'Brand Identity',
      skill3: 'Digital Marketing',
      skill4: 'Automation',
      skill5: 'Web Dev',
      experienceTitle: 'Experience',
      lineLabel: 'LINE',
      emailLabel: 'Email',
      ctaText: 'Contact me',
    };
    return data[key] ?? `${ns}.${key}`;
  },
}));

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import { AboutContent } from '../AboutContent';

describe('AboutContent', () => {
  it('renders the eyebrow label', () => {
    render(<AboutContent />);
    expect(screen.getByText('Eyebrow text')).toBeInTheDocument();
  });

  it('renders bio text', () => {
    render(<AboutContent />);
    expect(screen.getByText('Bio text')).toBeInTheDocument();
  });

  it('renders skill tags', () => {
    render(<AboutContent />);
    expect(screen.getByText('Photography')).toBeInTheDocument();
    expect(screen.getByText('Web Dev')).toBeInTheDocument();
    expect(screen.getByText('Automation')).toBeInTheDocument();
  });

  it('renders CTA link to /contact', () => {
    render(<AboutContent />);
    const cta = screen.getByRole('link', { name: 'Contact me' });
    expect(cta).toHaveAttribute('href', '/contact');
  });

  it('renders timeline entries', () => {
    render(<AboutContent />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
    // Timeline has at least 2 entries
    const timelineItems = screen.getAllByRole('listitem');
    expect(timelineItems.length).toBeGreaterThanOrEqual(2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/about/__tests__/AboutContent.test.tsx
```
Expected: FAIL — "Cannot find module '../AboutContent'"

- [ ] **Step 3: Create `src/components/about/AboutContent.tsx`**

```typescript
'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface TimelineEntry {
  year: string;
  role: string;
  company?: string;
}

const TIMELINE: TimelineEntry[] = [
  { year: '2023', role: '自由攝影師 / Freelance Photographer' },
  { year: '2021', role: '數位行銷專員 / Digital Marketing' },
  { year: '2019', role: '品牌設計 / Brand Design' },
];

const SKILL_KEYS = ['skill1', 'skill2', 'skill3', 'skill4', 'skill5'] as const;

export function AboutContent() {
  const t = useTranslations('about');

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-[240px_1fr]">

        {/* Left: photo + contact links */}
        <div className="flex flex-col items-center gap-4 md:items-start">
          <div className="relative h-52 w-52 overflow-hidden rounded-[var(--t-radius-card)] bg-[var(--t-surface)] border border-[var(--t-border)]">
            <Image
              src="/photos/placeholder.jpg"
              alt="Nomisas"
              fill
              className="object-cover"
              sizes="208px"
            />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {process.env.NEXT_PUBLIC_LINE_ID && (
              <a
                href={`https://line.me/ti/p/${process.env.NEXT_PUBLIC_LINE_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--t-muted)] hover:text-[var(--brand-accent)] transition-colors"
              >
                <span>💬</span> {t('lineLabel')}
              </a>
            )}
            {process.env.NEXT_PUBLIC_CONTACT_EMAIL && (
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-[var(--t-muted)] hover:text-[var(--brand-accent)] transition-colors"
              >
                <span>✉️</span> {t('emailLabel')}
              </a>
            )}
          </div>
        </div>

        {/* Right: bio + skills + timeline + CTA */}
        <div>
          <p className="mb-1 text-sm font-semibold tracking-widest text-[var(--brand-accent)] uppercase">
            {t('eyebrow')}
          </p>
          <h1 className="mb-4 font-display text-3xl font-bold text-[var(--t-text)]">
            Nomisas
          </h1>
          <p className="mb-8 leading-relaxed text-[var(--t-muted)]">
            {t('bio')}
          </p>

          {/* Skills */}
          <h2 className="mb-3 font-display text-lg font-semibold text-[var(--t-text)]">
            {t('skillsTitle')}
          </h2>
          <div className="mb-8 flex flex-wrap gap-2">
            {SKILL_KEYS.map((key) => (
              <span
                key={key}
                className="rounded-[var(--t-radius-button)] border border-[var(--t-border)] bg-[var(--t-surface)] px-3 py-1 text-sm text-[var(--t-text)]"
              >
                {t(key)}
              </span>
            ))}
          </div>

          {/* Timeline */}
          <h2 className="mb-4 font-display text-lg font-semibold text-[var(--t-text)]">
            {t('experienceTitle')}
          </h2>
          <ul className="mb-10 flex flex-col gap-3">
            {TIMELINE.map((entry) => (
              <li key={entry.year} className="flex items-center gap-3">
                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[var(--brand-accent)]" />
                <span className="text-sm font-semibold text-[var(--t-text)]">{entry.year}</span>
                <span className="text-sm text-[var(--t-muted)]">{entry.role}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-block rounded-[var(--t-radius-button)] bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-opacity hover:opacity-80"
          >
            {t('ctaText')}
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/app/[locale]/about/page.tsx`**

```typescript
import { AboutContent } from '@/components/about/AboutContent';

export default function AboutPage() {
  return <AboutContent />;
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run src/components/about/__tests__/AboutContent.test.tsx
```
Expected: PASS (5 tests)

- [ ] **Step 6: Commit**

```bash
git add src/components/about/ src/app/\[locale\]/about/
git commit -m "feat: add about page with two-column layout, skills, and timeline"
```

---

### Task 7: Contact Form

**Files:**
- Create: `src/components/contact/ContactForm.tsx`
- Create: `src/components/contact/__tests__/ContactForm.test.tsx`
- Create: `src/app/[locale]/contact/page.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/contact/__tests__/ContactForm.test.tsx`:

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    ({
      title: 'Contact',
      subtitle: 'Subtitle',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Email',
      serviceLabel: 'Service',
      servicePhotography: 'Photography',
      serviceMarketing: 'Marketing',
      serviceAutomation: 'Automation',
      serviceOther: 'Other',
      messageLabel: 'Message',
      messagePlaceholder: 'Describe...',
      budgetLabel: 'Budget',
      budgetUnknown: 'Not sure',
      budgetUnder10k: 'Under 10k',
      budget10k30k: '10k-30k',
      budgetOver30k: 'Over 30k',
      submitButton: 'Send',
      submitting: 'Sending...',
      errorMessage: 'Error',
    }[key] ?? key),
}));

const mockPush = vi.fn();
vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

import { ContactForm } from '../ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    mockPush.mockClear();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('renders all required form fields', () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Describe...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('renders service type select', () => {
    render(<ContactForm />);
    expect(screen.getByText('Photography')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false } as Response);
    render(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Describe...'), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  it('redirects to /thank-you on successful submit', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: true } as Response);
    render(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Describe...'), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/thank-you');
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/contact/__tests__/ContactForm.test.tsx
```
Expected: FAIL — "Cannot find module '../ContactForm'"

- [ ] **Step 3: Create `src/components/contact/ContactForm.tsx`**

```typescript
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

interface FormState {
  name: string;
  email: string;
  service: string;
  message: string;
  budget: string;
}

export function ContactForm() {
  const t = useTranslations('contact');
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    service: 'photography',
    message: '',
    budget: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
          ...form,
        }),
      });

      if (!res.ok) throw new Error('Submit failed');
      router.push('/thank-you');
    } catch {
      setError(t('errorMessage'));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-[var(--t-radius-button)] border border-[var(--t-border)] bg-[var(--t-bg)] px-4 py-3 text-sm text-[var(--t-text)] placeholder:text-[var(--t-muted)] focus:border-[var(--brand-accent)] focus:outline-none';

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="mb-2 font-display text-3xl font-bold text-[var(--t-text)]">
        {t('title')}
      </h1>
      <p className="mb-8 text-[var(--t-muted)]">{t('subtitle')}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          type="text"
          required
          placeholder={t('namePlaceholder')}
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          name="email"
          type="email"
          required
          placeholder={t('emailPlaceholder')}
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--t-text)]">
            {t('serviceLabel')}
          </label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="photography">{t('servicePhotography')}</option>
            <option value="marketing">{t('serviceMarketing')}</option>
            <option value="automation">{t('serviceAutomation')}</option>
            <option value="other">{t('serviceOther')}</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--t-text)]">
            {t('messageLabel')}
          </label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder={t('messagePlaceholder')}
            value={form.message}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--t-text)]">
            {t('budgetLabel')}
          </label>
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">{t('budgetUnknown')}</option>
            <option value="under10k">{t('budgetUnder10k')}</option>
            <option value="10k30k">{t('budget10k30k')}</option>
            <option value="over30k">{t('budgetOver30k')}</option>
          </select>
        </div>

        {error && (
          <p className="text-sm text-[var(--brand-accent)]">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-[var(--t-radius-button)] bg-[var(--brand-accent)] px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? t('submitting') : t('submitButton')}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/app/[locale]/contact/page.tsx`**

```typescript
import { ContactForm } from '@/components/contact/ContactForm';

export default function ContactPage() {
  return <ContactForm />;
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run src/components/contact/__tests__/ContactForm.test.tsx
```
Expected: PASS (4 tests)

- [ ] **Step 6: Commit**

```bash
git add src/components/contact/ src/app/\[locale\]/contact/
git commit -m "feat: add contact page with Web3Forms integration"
```

---

### Task 8: Thank-You Page

**Files:**
- Create: `src/app/[locale]/thank-you/page.tsx`

- [ ] **Step 1: Create `src/app/[locale]/thank-you/page.tsx`**

```typescript
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function ThankYouPage() {
  const t = useTranslations('thankyou');
  const lineId = process.env.NEXT_PUBLIC_LINE_ID;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 text-5xl">✅</div>
      <h1 className="mb-3 font-display text-3xl font-bold text-[var(--t-text)]">
        {t('title')}
      </h1>
      <p className="mb-10 text-[var(--t-muted)]">{t('subtitle')}</p>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        {lineId && (
          <a
            href={`https://line.me/ti/p/${lineId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[var(--t-radius-button)] bg-[#06C755] px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t('lineButton')}
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="rounded-[var(--t-radius-button)] border border-[var(--t-border)] bg-[var(--t-bg)] px-6 py-3 font-semibold text-[var(--t-text)] transition-colors hover:border-[var(--brand-accent)]"
          >
            {t('emailButton')}
          </a>
        )}
      </div>

      <Link
        href="/"
        className="mt-8 text-sm text-[var(--t-muted)] underline underline-offset-4 hover:text-[var(--t-text)]"
      >
        {t('backHome')}
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Run all tests**

```bash
npx vitest run
```
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/\[locale\]/thank-you/
git commit -m "feat: add thank-you page with LINE and email CTAs"
```

---

### Task 9: Nav Update + Final Verification

**Files:**
- Modify: `src/components/layout/Nav.tsx`
- Modify: `src/components/layout/__tests__/Nav.test.tsx`

- [ ] **Step 1: Add `about` to NAV_LINKS in `src/components/layout/Nav.tsx`**

Change the `NAV_LINKS` array from:
```typescript
const NAV_LINKS = [
  { key: 'home' as const,        href: '/'            },
  { key: 'photography' as const, href: '/photography' },
  { key: 'work' as const,        href: '/work'        },
  { key: 'blog' as const,        href: '/blog'        },
  { key: 'services' as const,    href: '/services'    },
  { key: 'resources' as const,   href: '/resources'   },
] as const;
```

To:
```typescript
const NAV_LINKS = [
  { key: 'home' as const,        href: '/'            },
  { key: 'photography' as const, href: '/photography' },
  { key: 'work' as const,        href: '/work'        },
  { key: 'blog' as const,        href: '/blog'        },
  { key: 'services' as const,    href: '/services'    },
  { key: 'resources' as const,   href: '/resources'   },
  { key: 'about' as const,       href: '/about'       },
] as const;
```

- [ ] **Step 2: Update `src/components/layout/__tests__/Nav.test.tsx`**

Read the current Nav test and add one assertion verifying the About link renders. Add after the existing link tests:

```typescript
it('renders the About nav link', () => {
  render(<Nav />);
  expect(screen.getByRole('link', { name: '關於我' })).toBeInTheDocument();
});
```

> Note: The existing Nav mock returns `(key: string) => key` or a fixed map. Update the mock's nav map to include `about: '關於我'`.

The mock in `Nav.test.tsx` should look like:

```typescript
vi.mock('next-intl', () => ({
  useTranslations: (ns: string) => (key: string) => {
    if (ns === 'nav') {
      return ({
        home: '首頁',
        photography: '攝影作品',
        work: '專案案例',
        blog: '文章',
        services: '服務項目',
        resources: '工具資源',
        about: '關於我',
      } as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));
```

- [ ] **Step 3: Run Nav tests to verify they pass**

```bash
npx vitest run src/components/layout/__tests__/Nav.test.tsx
```
Expected: All PASS (including the new About link test)

- [ ] **Step 4: Run the full test suite**

```bash
npx vitest run
```
Expected: All tests PASS. Note the total count — it should be higher than Phase 1's 8 tests.

- [ ] **Step 5: TypeScript check**

```bash
npx tsc --noEmit
```
Expected: 0 errors

- [ ] **Step 6: Build check**

```bash
npm run build 2>&1 | tail -20
```
Expected: Build succeeds. Page count should now be higher than Phase 1's 22 pages (new routes: /about, /contact, /thank-you × 3 locales = 9 more = ~31 pages).

- [ ] **Step 7: Final commit**

```bash
git add src/components/layout/
git commit -m "feat: add About link to nav, complete Phase 2 implementation"
```
