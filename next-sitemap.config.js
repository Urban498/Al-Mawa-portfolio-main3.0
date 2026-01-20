/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.al-mawa.international', // 👉 Replace with your actual domain (without trailing slash)
  generateRobotsTxt: true, // (optional) will generate robots.txt in addition to sitemap
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  // Exclude internal and admin routes from public sitemaps
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/admin/**'
  ],
};
