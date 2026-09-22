import { getCollection, type CollectionEntry } from 'astro:content';
export type Post = CollectionEntry<'blog'>;
export async function getPosts({ includeUnlisted = false } = {}) {
  const posts = (await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.permalink.localeCompare(b.data.permalink));
  const paths = new Set<string>();
  for (const post of posts) {
    if (paths.has(post.data.permalink)) throw new Error(`Duplicate permalink: ${post.data.permalink}`);
    paths.add(post.data.permalink);
    if (/^(archives|tags|categories|page|search|demo|rss\.xml|sitemap\.xml|404)(\/|$)/.test(post.data.permalink)) throw new Error(`Reserved permalink: ${post.data.permalink}`);
  }
  return posts.filter(post => includeUnlisted || !post.data.unlisted);
}
export const postUrl = (post: Post) => '/' + post.data.permalink.split('/').map(encodeURIComponent).join('/') + '/';
export const formatDate = (date: Date) => new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai' }).format(date).replaceAll('/', '-');
