import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostCard, PostFrontmatter, Category } from '@/types';
import { calculateReadingTime, countWords } from './utils';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'blog');

/**
 * Get all post slugs
 */
export function getPostSlugs(): string[] {
  const slugs: string[] = [];
  
  // Check if directory exists
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return slugs;
  }

  // Get all category directories
  const categories = fs.readdirSync(POSTS_DIRECTORY);

  for (const category of categories) {
    const categoryPath = path.join(POSTS_DIRECTORY, category);
    
    if (fs.statSync(categoryPath).isDirectory()) {
      const files = fs.readdirSync(categoryPath);
      
      for (const file of files) {
        if (file.endsWith('.mdx')) {
          slugs.push(file.replace('.mdx', ''));
        }
      }
    }
  }

  return slugs;
}

/**
 * Get post by slug
 */
export function getPostBySlug(slug: string): Post | null {
  // Search in all category directories
  const categories = ['ai', 'cloud', 'infra', 'database'];

  for (const category of categories) {
    const filePath = path.join(POSTS_DIRECTORY, category, `${slug}.mdx`);
    
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const frontmatter = data as PostFrontmatter;

      return {
        ...frontmatter,
        slug,
        content,
        readingTime: calculateReadingTime(content),
        wordCount: countWords(content),
      };
    }
  }

  return null;
}

/**
 * Get all posts
 */
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
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

