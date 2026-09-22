import { SITE } from '../config';
import { getPosts, postUrl } from '../lib/posts';
export async function GET() {
  const posts = await getPosts();
  const paths = ['/', '/archives/', '/tags/', ...posts.map(postUrl), ...new Set(posts.flatMap(p => p.data.tags.map(t => `/tags/${encodeURIComponent(t)}/`)))];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${new URL(path, SITE.url).href.replaceAll('&', '&amp;')}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
