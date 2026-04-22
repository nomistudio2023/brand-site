/**
 * Site-wide configuration — single source of truth for social links and contact info.
 * Change values here; all components pick them up automatically.
 */

export const siteConfig = {
  /**
   * LINE contact link.
   *
   * Personal account  → type: 'personal',  id: 'nomisas'
   *   renders: https://line.me/ti/p/~nomisas
   *
   * Official account  → type: 'official',  id: 'abc123'
   *   renders: https://lin.ee/abc123
   *
   * To switch to LINE Official Account:
   *   1. Get the short URL ID from LINE Official Account Manager
   *      (e.g. https://lin.ee/XXXXXXX → id is 'XXXXXXX')
   *   2. Change type to 'official' and id to that value
   */
  line: {
    type: 'personal' as 'personal' | 'official',
    id: 'nomisas',
  },

  /** Contact email — used in About page */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
} as const;

/** Returns the full LINE URL based on account type */
export function getLineUrl(line: typeof siteConfig.line): string {
  if (line.type === 'official') {
    return `https://lin.ee/${line.id}`;
  }
  return `https://line.me/ti/p/~${line.id}`;
}
