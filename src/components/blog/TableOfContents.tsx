'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { TocItem } from '@/types';

interface TableOfContentsProps {
  items: TocItem[];
}

/**
 * Table of contents component with scroll spy
 */
export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -80% 0%',
        threshold: 0,
      }
    );

    // Observe all headings
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-1">
      <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
        On this page
      </h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                'block py-1 text-sm transition-colors border-l-2',
                item.level === 2 && 'pl-4',
                item.level === 3 && 'pl-6',
                item.level === 4 && 'pl-8',
                activeId === item.id
                  ? 'text-accent-primary border-l-accent-primary'
                  : 'text-text-muted hover:text-text-secondary border-l-transparent hover:border-l-border'
              )}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  const offset = 100;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                  });
                  setActiveId(item.id);
                }
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;

