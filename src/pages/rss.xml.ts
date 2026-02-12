import rss from '@astrojs/rss';
import { getAllPosts } from '../lib/posts';

export async function GET() {
  const posts = await getAllPosts();

  return rss({
    title: '혜조로그',
    description: '코딩과 일기가 뒤죽박죽 섞여 있어요',
    site: 'https://hyezoprk.vercel.app',
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description ?? '',
      link: `/posts/${post.id.replace(/\.mdx?$/, '').split('/').pop() ?? post.id}`,
    })),
    customData: `<language>ko-KR</language>`,
  });
}
