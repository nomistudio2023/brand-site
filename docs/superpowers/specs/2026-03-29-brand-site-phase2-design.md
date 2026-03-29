# Brand-Site Phase 2 Design Spec

## Goal

Build the visual content layer of the brand site: enhanced home hero, photography gallery, about page, contact form, and thank-you page. All pages are static (no CMS in Phase 2) and support 3 locales (zh/en/ja).

## Architecture

Five pages built on top of the Phase 1 shell (Nav, Footer, FloatingActions, i18n routing, design tokens). New pages add routes `/about`, `/contact`, `/thank-you`. Existing `/photography` stub gets replaced with the real gallery. Home hero gets upgraded in-place.

**Tech Stack:** Next.js 16.2.1, next-intl v4, Tailwind CSS 4, Web3Forms (contact form), static JSON for gallery data.

---

## Design Decisions

### Base Theme
- Default: **Light** (white background `--t-bg: #ffffff`)
- Dark mode supported via `data-theme="dark"` toggle (already wired in tokens)
- Brand colors: `--brand-primary: #1a1a2e`, `--brand-accent: #e94560`

### Hero Layout (Home)
- **Split layout**: left text + CTA, right hero image
- Below fold: 3 service preview cards (攝影 / 行銷 / 自動化)

### Gallery Layout (Photography)
- **Uniform square grid**, 3 columns
- Category tabs: 全部 / 風景 / 人像 / 商業
- Tab state: client-side only (no URL change)
- Data: static `src/data/photos.ts`

### About Layout
- **Two-column**: left photo + contact links, right bio + skills + timeline
- Contact links: LINE official account, Email only (no Instagram)
- Skills: tags list
- Experience: dot timeline (2-3 entries)
- Bottom CTA → `/contact`

### Contact Layout
- **Centered form**, fields: Name, Email, Service type (dropdown), Project description (textarea), Budget range (optional dropdown)
- Handler: **Web3Forms** (static, no backend, free tier)
- On submit → redirect to `/thank-you`

### Thank-You Page
- Confirmation message + expected reply time
- LINE official account button
- Email link
- No Instagram

---

## Pages

### Page 1: Home (`/[locale]`)
**File to modify:** `src/app/[locale]/page.tsx`

Sections:
1. **Hero** (split layout, `'use client'` for scroll animation optional)
   - Left: eyebrow label, h1, subtitle, CTA button → `/photography`
   - Right: placeholder image block (swap for real photo later)
2. **Services preview** (3 cards, server component)
   - Each card: icon + title + one-line description + link
   - Photography → `/photography`, Marketing → `/services`, Automation → `/services`

New translation keys (`home` namespace):
```json
{
  "heroEyebrow": "Photography × Marketing × Automation",
  "heroTitle": "用影像說故事\n用技術創造價值",
  "heroSubtitle": "...",
  "heroCta": "查看作品",
  "servicesTitle": "我能為你做什麼",
  "service1Title": "攝影",
  "service1Desc": "...",
  "service2Title": "數位行銷",
  "service2Desc": "...",
  "service3Title": "自動化",
  "service3Desc": "..."
}
```

---

### Page 2: Photography Gallery (`/[locale]/photography`)
**File to modify:** `src/app/[locale]/photography/page.tsx`
**New file:** `src/data/photos.ts`
**New component:** `src/components/photography/GalleryGrid.tsx` (`'use client'`)

`photos.ts` shape:
```typescript
export interface Photo {
  id: string;
  src: string;       // path under /public/photos/
  alt: string;
  category: 'landscape' | 'portrait' | 'commercial';
  title: string;
}
export const photos: Photo[] = [
  // placeholder entries using /public/placeholder.jpg
];
```

`GalleryGrid.tsx`:
- Props: `photos: Photo[]`
- State: `activeCategory: 'all' | 'landscape' | 'portrait' | 'commercial'`
- Renders: category tabs + filtered grid
- Grid: `grid-cols-2 md:grid-cols-3`, square aspect ratio (`aspect-square`), `object-cover`
- Hover: overlay with photo title

Category tab labels (translation keys in `photography` namespace):
```json
{ "all": "全部", "landscape": "風景", "portrait": "人像", "commercial": "商業" }
```

---

### Page 3: About (`/[locale]/about`)
**New file:** `src/app/[locale]/about/page.tsx`
**New component:** `src/components/about/AboutContent.tsx` (Server Component)

Layout:
```
[Photo block]  |  [Name + eyebrow]
[LINE link  ]  |  [Bio paragraph]
[Email link ]  |  [Skills tags]
               |  [Timeline]
               |  [CTA → /contact]
```

Photo block: `<Image>` placeholder (swap for real portrait later), rounded, fixed width

Timeline entry shape (static data inline in component):
```typescript
interface TimelineEntry { year: string; role: string; company?: string; }
```

Translation keys (`about` namespace):
```json
{
  "eyebrow": "攝影師 × 數位行銷 × 自動化",
  "bio": "...",
  "skillsTitle": "專業技能",
  "skills": ["攝影", "品牌識別", "數位行銷", "自動化", "Web Dev"],
  "experienceTitle": "經歷",
  "ctaText": "想合作？聯絡我"
}
```

---

### Page 4: Contact (`/[locale]/contact`)
**New file:** `src/app/[locale]/contact/page.tsx`
**New component:** `src/components/contact/ContactForm.tsx` (`'use client'`)

Form fields:
| Field | Type | Required |
|-------|------|----------|
| name | text input | yes |
| email | email input | yes |
| serviceType | select | yes |
| message | textarea | yes |
| budget | select | no |

Service type options: 攝影 / 數位行銷 / 自動化 / 其他
Budget options: 不確定 / NT$10,000 以下 / NT$10,000–30,000 / NT$30,000 以上

Form submission:
- POST to `https://api.web3forms.com/submit`
- Required hidden field: `access_key` (from `NEXT_PUBLIC_WEB3FORMS_KEY` env var)
- On success → `router.push('/thank-you')` (locale-aware via `useRouter` from `@/i18n/navigation`)
- On error → inline error message

Translation keys (`contact` namespace):
```json
{
  "title": "聯絡我",
  "subtitle": "有專案想聊？填寫後我會盡快回覆",
  "namePlaceholder": "你的姓名",
  "emailPlaceholder": "Email",
  "serviceLabel": "服務類型",
  "messageLabel": "專案描述",
  "budgetLabel": "預算範圍（選填）",
  "submitButton": "送出",
  "submitting": "送出中...",
  "errorMessage": "送出失敗，請稍後再試"
}
```

---

### Page 5: Thank You (`/[locale]/thank-you`)
**New file:** `src/app/[locale]/thank-you/page.tsx`

Content (Server Component, no interaction needed):
- Heading: 感謝您的填寫
- Subtext: 我將在 1-2 個工作日內回覆
- LINE button: links to `NEXT_PUBLIC_LINE_ID` env var (already exists from Phase 1 FloatingActions)
- Email link: `NEXT_PUBLIC_CONTACT_EMAIL` env var
- Back to home link

Translation keys (`thankyou` namespace):
```json
{
  "title": "感謝您的填寫",
  "subtitle": "我將在 1-2 個工作日內回覆",
  "lineButton": "加入 LINE 官方帳號",
  "emailButton": "發送 Email",
  "backHome": "回首頁"
}
```

---

## Environment Variables (additions)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email shown on thank-you page |
| `NEXT_PUBLIC_LINE_ID` | Already exists from Phase 1 |

---

## Testing

Each new component gets a Vitest unit test:
- `GalleryGrid.test.tsx`: renders all photos, tab filtering works
- `ContactForm.test.tsx`: renders fields, shows error on failed submit
- `AboutContent.test.tsx`: renders skills and timeline entries
- Translation key coverage: zh/en/ja all have the same keys

---

## Out of Scope (Phase 2)

- CMS integration (photos stay as static data)
- Blog, Services, Resources pages (remain as stubs)
- Work/Case Studies page
- Dark mode toggle UI (tokens ready, UI toggle deferred)
- Real photos (use placeholders; swap in Phase 3)
