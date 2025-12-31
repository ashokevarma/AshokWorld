'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Post } from '@/types';
import { PostCard } from '@/components/blog/PostCard';
import { Button } from '@/components/ui';

interface LatestPostsProps {
  posts: Post[];
}

type TimeFilter = 'week' | 'month' | 'year' | '5years' | 'all';

const timeFilters: { key: TimeFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'week', label: 'Last Week' },
  { key: 'month', label: 'Last Month' },
  { key: 'year', label: 'Last Year' },
  { key: '5years', label: 'Last 5 Years' },
];

/**
 * Filter posts by time period
 */
function filterPostsByTime(posts: Post[], filter: TimeFilter): Post[] {
  if (filter === 'all') return posts;

  const now = new Date();
  const cutoffDate = new Date();

  switch (filter) {
    case 'week':
      cutoffDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      cutoffDate.setMonth(now.getMonth() - 1);
      break;
    case 'year':
      cutoffDate.setFullYear(now.getFullYear() - 1);
      break;
    case '5years':
      cutoffDate.setFullYear(now.getFullYear() - 5);
      break;
  }

  return posts.filter((post) => new Date(post.date) >= cutoffDate);
}

/**
 * Latest posts section for homepage with time filtering
 */
export function LatestPosts({ posts }: LatestPostsProps) {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('all');

  const filteredPosts = useMemo(
    () => filterPostsByTime(posts, activeFilter),
    [posts, activeFilter]
  );

  if (posts.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-text-primary mb-4">
              Latest Articles
            </h2>
            <p className="text-text-secondary mb-8">
              No posts yet. Check back soon for new content!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary mb-1 sm:mb-2">
              Latest Articles
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              Deep dives into technology, engineering, and best practices.
            </p>
          </div>
          <Link href="/blog" className="self-start sm:self-auto">
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View all posts
            </Button>
          </Link>
        </div>

        {/* Time Filter Tabs - Scrollable on mobile */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 sm:mb-8">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1 bg-bg-elevated rounded-xl border border-border w-max sm:w-fit">
            {timeFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`
                  flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap
                  ${
                    activeFilter === filter.key
                      ? 'bg-accent-primary text-bg-primary shadow-lg shadow-accent-primary/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                  }
                `}
              >
                {filter.key !== 'all' && <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-text-muted">
            Showing <span className="text-accent-primary font-medium">{filteredPosts.length}</span> 
            {filteredPosts.length === 1 ? ' article' : ' articles'}
            {activeFilter !== 'all' && (
              <span> from {timeFilters.find(f => f.key === activeFilter)?.label.toLowerCase()}</span>
            )}
          </p>
        </div>

        {/* Posts grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <div
                key={post.slug}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-bg-elevated rounded-xl border border-border">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
              No articles in this period
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Try selecting a different time range to see more content.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="text-accent-primary hover:underline text-sm"
            >
              View all articles →
            </button>
          </div>
        )}

        {/* Featured post (first one, larger) */}
        {filteredPosts.length > 3 && filteredPosts[0].featured && (
          <div className="mt-12">
            <h3 className="text-xl font-display font-semibold text-text-primary mb-6">
              Featured
            </h3>
            <Link href={`/blog/${filteredPosts[0].slug}`} className="block group">
              <article className="relative overflow-hidden rounded-2xl bg-bg-elevated border border-border card-hover">
                {filteredPosts[0].image && (
                  <div className="aspect-[21/9] overflow-hidden">
                    <img
                      src={filteredPosts[0].image}
                      alt={filteredPosts[0].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                    <span>{filteredPosts[0].readingTime}</span>
                    <span>•</span>
                    <span>{new Date(filteredPosts[0].date).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-2xl font-display font-semibold text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
                    {filteredPosts[0].title}
                  </h4>
                  <p className="text-text-secondary line-clamp-2">
                    {filteredPosts[0].description}
                  </p>
                </div>
              </article>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default LatestPosts;
