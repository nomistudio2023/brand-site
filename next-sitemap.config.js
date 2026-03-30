/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yoursite.pages.dev',
  generateRobotsTxt: true,
  outDir: './out',
};
