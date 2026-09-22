import { SITE } from '../config';
export function GET() { return new Response(`User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`); }
