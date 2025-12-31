'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Category } from '@/types';

type BadgeVariant = 'default' | 'category' | 'outline';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  category?: Category;
}

const categoryStyles: Record<Category, string> = {
  ai: 'bg-category-ai/10 text-category-ai border-category-ai/20',
  cloud: 'bg-category-cloud/10 text-category-cloud border-category-cloud/20',
  infra: 'bg-category-infra/10 text-category-infra border-category-infra/20',
  database: 'bg-category-database/10 text-category-database border-category-database/20',
};

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-bg-elevated text-text-secondary border-border',
  category: '', // Applied based on category prop
  outline: 'bg-transparent text-text-secondary border-border',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

/**
 * Badge component
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      category,
      className,
      ...props
    },
    ref
  ) => {
    const isCategory = variant === 'category' && category;

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center',
          'font-medium rounded-full border',
          'transition-colors duration-200',
          sizeStyles[size],
          isCategory ? categoryStyles[category] : variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * Category badge component - convenience wrapper
 */
interface CategoryBadgeProps extends Omit<BadgeProps, 'variant' | 'category'> {
  category: Category;
}

export const CategoryBadge = forwardRef<HTMLSpanElement, CategoryBadgeProps>(
  ({ category, children, ...props }, ref) => {
    const categoryNames: Record<Category, string> = {
      ai: 'AI & ML',
      cloud: 'Cloud',
      infra: 'Infrastructure',
      database: 'Database',
    };

    return (
      <Badge ref={ref} variant="category" category={category} {...props}>
        {children || categoryNames[category]}
      </Badge>
    );
  }
);

CategoryBadge.displayName = 'CategoryBadge';

export default Badge;

