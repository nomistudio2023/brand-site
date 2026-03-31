import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nomisas.pages.dev'),
  title: {
    template: '%s | Nomisas',
    default: 'Nomisas — Photography × Marketing × Automation',
  },
  description: 'Nomisas — Photography × Marketing × Automation',
  openGraph: {
    type: 'website',
    siteName: 'Nomisas',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: '/og-default.jpg' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
