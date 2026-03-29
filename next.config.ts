import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // output: 'export' is intentionally omitted in Phase 1.
  // Proxy-based language detection requires a runtime.
  // Phase 3 will configure @cloudflare/next-on-pages for deployment.
};

export default withNextIntl(nextConfig);
