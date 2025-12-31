import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getPostCountByCategory } from '@/lib/posts';
import { getCategoryBySlug, categories } from '@/lib/config';
import { PostCard } from '@/components/blog/PostCard';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { Category } from '@/types';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

/**
 * Generate static params for all categories
 */
export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

/**
 * Generate metadata for category page
 */
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} Articles`,
    description: category.description,
  };
}

/**
 * Category page - filtered blog listing
 */
export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(params.category as Category);
  const counts = getPostCountByCategory();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            {category.description}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter activeCategory={params.category as Category} counts={counts} />
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
            <div className="text-6xl mb-4">📂</div>
            <h2 className="text-xl font-display font-semibold text-text-primary mb-2">
              No posts in this category
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

