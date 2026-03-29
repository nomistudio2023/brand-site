import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './src/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

// Next.js 16: proxy.ts replaces middleware.ts; exported function must be named `proxy`
export function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  // Match all routes except static files, Next.js internals, and API
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'  ]
};
