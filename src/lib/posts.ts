import { getCollection } from 'astro:content';

export type PostEntry = Awaited<ReturnType<typeof getAllPosts>>[number];

export async function getAllPosts() {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
}

export async function getSortedPostsData(tag?: string) {
  const posts = await getAllPosts();
  if (!tag) return posts;
  return posts.filter(post => {
    const tags = post.data.tags;
    if (typeof tags === 'string') return tags === tag;
    return tags.includes(tag);
  });
}

export async function getPinnedPosts() {
  const posts = await getAllPosts();
  return posts.filter(post => post.data.pinned);
}

export async function getRecentPosts() {
  const posts = await getAllPosts();
  const threeWeeksAgo = new Date();
  threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
  const cutoff = threeWeeksAgo.toISOString().slice(0, 10);
  const seen = new Set<string>();
  const result: typeof posts = [];
  for (const post of posts) {
    if (post.data.pinned || post.data.date >= cutoff) {
      if (!seen.has(post.id)) {
        seen.add(post.id);
        result.push(post);
      }
    }
    if (result.length >= 10) break;
  }
  return result;
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    const tags = post.data.tags;
    if (typeof tags === 'string') tagSet.add(tags);
    else tags.forEach(t => tagSet.add(t));
  }
  return Array.from(tagSet);
}

export async function getTagsByCategory(category: string) {
  const posts = await getAllPosts();
  const filtered = posts.filter(p => p.data.categories === category);
  const tagSet = new Set<string>();
  for (const post of filtered) {
    const tags = post.data.tags;
    if (typeof tags === 'string') tagSet.add(tags);
    else tags.forEach(t => tagSet.add(t));
  }
  return Array.from(tagSet);
}

export async function getSeriesPosts(series: string) {
  const posts = await getAllPosts();
  return posts
    .filter(p => p.data.series === series)
    .sort((a, b) => (a.data.date > b.data.date ? 1 : -1));
}

export function getPostId(post: PostEntry) {
  // slug is the file name without extension, relative to the collection root
  return post.id.replace(/\.mdx?$/, '').split('/').pop() ?? post.id;
}

export async function getAllPostIds() {
  const posts = await getAllPosts();
  return posts.map(post => getPostId(post));
}
