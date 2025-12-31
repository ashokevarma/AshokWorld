import { Metadata } from 'next';
import { getAllPosts, getPostCountByCategory } from '@/lib/posts';
import { PostCard } from '@/components/blog/PostCard';
import { CategoryFilter } from '@/components/blog/CategoryFilter';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Deep dives into AI, Cloud, Infrastructure, and Database technologies.',
};

/**
 * Blog listing page
 */
export default function BlogPage() {
  const posts = getAllPosts();
  const counts = getPostCountByCategory();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
            Blog
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Thoughts on software engineering, system design, and the technologies
            that power modern applications.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter counts={counts} />
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <div
                key={post.slug}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-xl font-display font-semibold text-text-primary mb-2">
              No posts yet
            </h2>
            <p className="text-text-secondary">
              Check back soon for new content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

