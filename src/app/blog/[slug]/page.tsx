import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getPostBySlug, getPostSlugs, getRelatedPosts } from '@/lib/posts';
import { compileMdxContent } from '@/lib/mdx';
import { formatDate, extractHeadings } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { CategoryBadge, Button } from '@/components/ui';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { PostCard } from '@/components/blog/PostCard';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all blog posts
 */
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for blog post
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

/**
 * Blog post page
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Compile MDX content
  const { content } = await compileMdxContent(post.content);

  // Extract headings for table of contents
  const headings = extractHeadings(post.content);

  // Get related posts
  const relatedPosts = getRelatedPosts(slug, post.category, 3);

  return (
    <article className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Back link */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article layout */}
        <div className="grid lg:grid-cols-[1fr_250px] gap-12">
          {/* Main content */}
          <div className="min-w-0">
            {/* Header */}
            <header className="mb-10">
              {/* Category */}
              <div className="mb-4">
                <CategoryBadge category={post.category} />
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-text-secondary mb-6">
                {post.description}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted pb-6 border-b border-border">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readingTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  {post.tags.slice(0, 3).join(', ')}
                </span>
              </div>
            </header>

            {/* Feature image */}
            {post.image && (
              <div className="mb-10 rounded-xl overflow-hidden border border-border">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* MDX Content */}
            <div className="mdx-content prose prose-lg max-w-none">
              {content}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-bg-elevated border border-border rounded-full text-text-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="mt-8 p-6 bg-bg-secondary rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center text-2xl font-display font-bold gradient-text">
                  {siteConfig.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-text-primary">
                    {siteConfig.author.name}
                  </p>
                  <p className="text-sm text-text-secondary">
                    Software Engineer passionate about building scalable systems
                  </p>
                </div>
              </div>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-display font-bold text-text-primary mb-6">
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <PostCard key={relatedPost.slug} post={relatedPost} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents items={headings} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
