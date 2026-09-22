import rss from '@astrojs/rss';
import { SITE } from '../config';
import { getPosts, postUrl } from '../lib/posts';
export async function GET() {
  return rss({ title: SITE.title, description: SITE.description, site: SITE.url, items: (await getPosts()).map(post => ({ title: post.data.title, description: post.data.description, pubDate: post.data.date, link: postUrl(post) })), customData: '<language>zh-cn</language>' });
}
