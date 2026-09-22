import { getPosts, postUrl, formatDate } from '../lib/posts';
export async function GET() {
  return Response.json((await getPosts()).map(post => ({ title: post.data.title, description: post.data.description, tags: post.data.tags, date: formatDate(post.data.date), url: postUrl(post) })));
}
