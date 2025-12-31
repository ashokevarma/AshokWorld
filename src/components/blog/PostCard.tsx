import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import { Post } from '@/types';
import { Card, CategoryBadge } from '@/components/ui';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact';
}

/**
 * Post card component for blog listing
 */
export function PostCard({ post, variant = 'default' }: PostCardProps) {
  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug}`} className="block group">
        <article className="flex items-start gap-4 p-4 rounded-xl hover:bg-bg-elevated transition-colors">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-text-primary group-hover:text-accent-primary transition-colors line-clamp-1">
              {post.title}
            </h3>
            <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
          <CategoryBadge category={post.category} size="sm" />
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <Card hover className="h-full flex flex-col">
        {/* Image */}
        {post.image && (
          <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Category */}
          <div className="mb-3">
            <CategoryBadge category={post.category} />
          </div>

          {/* Title */}
          <h3 className="text-lg font-display font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-1">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-text-muted pt-4 border-t border-border">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default PostCard;

