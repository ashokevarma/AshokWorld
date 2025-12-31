'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/config';
import { Category } from '@/types';

interface CategoryFilterProps {
  activeCategory?: Category | 'all';
  counts?: Record<Category, number>;
}

/**
 * Category filter component for blog listing
 */
export function CategoryFilter({ activeCategory = 'all', counts }: CategoryFilterProps) {
  const pathname = usePathname();

  const allCount = counts
    ? Object.values(counts).reduce((sum, count) => sum + count, 0)
    : undefined;

  return (
    <div className="flex flex-wrap gap-2">
      {/* All posts link */}
      <Link
        href="/blog"
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-all',
          'border',
          activeCategory === 'all' || pathname === '/blog'
            ? 'bg-accent-primary text-bg-primary border-accent-primary'
            : 'bg-transparent text-text-secondary border-border hover:border-border-hover hover:text-text-primary'
        )}
      >
        All
        {allCount !== undefined && (
          <span className="ml-1.5 opacity-60">({allCount})</span>
        )}
      </Link>

      {/* Category links */}
      {categories.map((category) => {
        const isActive = activeCategory === category.slug;
        const count = counts?.[category.slug];
        
        const categoryColors: Record<Category, string> = {
          ai: 'border-category-ai text-category-ai bg-category-ai/10',
          cloud: 'border-category-cloud text-category-cloud bg-category-cloud/10',
          infra: 'border-category-infra text-category-infra bg-category-infra/10',
          database: 'border-category-database text-category-database bg-category-database/10',
        };

        return (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              'border',
              isActive
                ? categoryColors[category.slug]
                : 'bg-transparent text-text-secondary border-border hover:border-border-hover hover:text-text-primary'
            )}
          >
            {category.name}
            {count !== undefined && (
              <span className="ml-1.5 opacity-60">({count})</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default CategoryFilter;

