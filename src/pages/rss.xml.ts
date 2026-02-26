import rss from '@astrojs/rss';
import { getAllPosts } from '../lib/posts';

export async function GET() {
  const posts = await getAllPosts();

  return rss({
    title: '혜조로그',
    description: '이게 다예요 🫠',
    site: 'https://hyezoprk.vercel.app',
    xmlns: { webfeeds: 'http://webfeeds.org/rss/1.0', dc: 'http://purl.org/dc/elements/1.1/' },
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description ?? '',
      link: `/posts/${post.id.replace(/\.mdx?$/, '').split('/').pop() ?? post.id}`,
      author: 'ㅎㅈ',
      customData: '<dc:creator>ㅎㅈ</dc:creator>',
    })),
    customData: `<language>ko-KR</language><managingEditor>ㅎㅈ</managingEditor><image><url>https://hyezoprk.vercel.app/images/2022/summer/heart.png</url><title>혜조로그</title><link>https://hyezoprk.vercel.app</link></image><webfeeds:icon>https://hyezoprk.vercel.app/images/2022/summer/heart.png</webfeeds:icon>`,
  });
}
