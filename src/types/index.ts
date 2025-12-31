/**
 * Blog post category types
 */
export type Category = 'ai' | 'cloud' | 'infra' | 'database';

/**
 * Category metadata
 */
export interface CategoryMeta {
  slug: Category;
  name: string;
  description: string;
  color: string;
}

/**
 * Blog post frontmatter
 */
export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: Category;
  tags: string[];
  image?: string;
  published: boolean;
  featured?: boolean;
}

/**
 * Blog post with computed fields
 */
export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
  wordCount: number;
}

/**
 * Post card display data
 */
export interface PostCard {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  readingTime: string;
  image?: string;
}

/**
 * Table of contents item
 */
export interface TocItem {
  id: string;
  title: string;
  level: number;
}

/**
 * Site configuration
 */
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: {
    name: string;
    email: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  links: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

/**
 * Navigation item
 */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Tech stack item for homepage
 */
export interface TechItem {
  name: string;
  icon: string;
  category: 'language' | 'framework' | 'cloud' | 'database' | 'tool';
}

/**
 * View count data from D1
 */
export interface ViewCount {
  slug: string;
  views: number;
}

/**
 * API response types
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

