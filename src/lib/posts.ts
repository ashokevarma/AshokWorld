import { Post, PostCard, Category } from '@/types';

// Import pre-generated posts data (generated at build time)
import postsData from './posts-data.json';

// Type assertion for the imported JSON
const allPostsData = postsData as Post[];

/**
 * Get all post slugs
 */
export function getPostSlugs(): string[] {
  return allPostsData.map(post => post.slug);
}

/**
 * Get post by slug
 */
export function getPostBySlug(slug: string): Post | null {
  return allPostsData.find(post => post.slug === slug) || null;
}

/**
 * Get all posts
 */
export function getAllPosts(): Post[] {
  return allPostsData.filter(post => post.published);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured);
}

/**
 * Get latest posts
 */
export function getLatestPosts(count: number = 5): Post[] {
  return getAllPosts().slice(0, count);
}

/**
 * Get related posts by category (excluding current post)
 */
export function getRelatedPosts(currentSlug: string, category: Category, count: number = 3): Post[] {
  return getPostsByCategory(category)
    .filter((post) => post.slug !== currentSlug)
    .slice(0, count);
}

/**
 * Convert Post to PostCard for listing
 */
export function postToCard(post: Post): PostCard {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    readingTime: post.readingTime,
    image: post.image,
  };
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Search posts by query
 */
export function searchPosts(query: string): Post[] {
  const lowercaseQuery = query.toLowerCase();
  
  return getAllPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.description.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get post count by category
 */
export function getPostCountByCategory(): Record<Category, number> {
  const posts = getAllPosts();
  
  return {
    ai: posts.filter((p) => p.category === 'ai').length,
    cloud: posts.filter((p) => p.category === 'cloud').length,
    infra: posts.filter((p) => p.category === 'infra').length,
    database: posts.filter((p) => p.category === 'database').length,
  };
}
