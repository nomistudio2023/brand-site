import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Nomisas',
    default: 'Nomisas — Photography × Marketing × Automation',
  },
  description: 'Personal brand site',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
