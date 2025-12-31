'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Github, Twitter, Linkedin, ChevronDown, Cloud, Brain, Server, Database, BookOpen, FileText, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig, socialLinks, categories, recommendSections } from '@/lib/config';

/**
 * Category icons mapping
 */
const categoryIcons = {
  ai: Brain,
  cloud: Cloud,
  infra: Server,
  database: Database,
};

/**
 * Recommend section icons mapping
 */
const recommendIcons = {
  books: BookOpen,
  articles: FileText,
  videos: Video,
};

/**
 * Header component with navigation
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isRecommendOpen, setIsRecommendOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const recommendRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoriesOpen(false);
    setIsRecommendOpen(false);
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
      if (recommendRef.current && !recommendRef.current.contains(event.target as Node)) {
        setIsRecommendOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    github: <Github className="w-5 h-5" />,
    twitter: <Twitter className="w-5 h-5" />,
    linkedin: <Linkedin className="w-5 h-5" />,
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300',
        isScrolled
          ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl font-display font-bold text-text-primary group-hover:text-accent-primary transition-colors">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Home */}
            <Link
              href="/"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                pathname === '/'
                  ? 'text-accent-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
              )}
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                onClick={() => {
                  setIsCategoriesOpen(!isCategoriesOpen);
                  setIsRecommendOpen(false);
                }}
                className={cn(
                  'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                  pathname.startsWith('/category')
                    ? 'text-accent-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                )}
              >
                Categories
                <ChevronDown className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  isCategoriesOpen && 'rotate-180'
                )} />
              </button>

              {/* Dropdown Menu */}
              {isCategoriesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-4 bg-white rounded-xl shadow-xl border border-gray-100 animate-fade-in">
                  {/* Arrow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />
                  
                  <div className="relative grid grid-cols-2 gap-2">
                    {categories.map((category) => {
                      const Icon = categoryIcons[category.slug as keyof typeof categoryIcons];
                      return (
                        <Link
                          key={category.slug}
                          href={`/category/${category.slug}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          onClick={() => setIsCategoriesOpen(false)}
                        >
                          <Icon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {category.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Blog */}
            <Link
              href="/blog"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                pathname === '/blog' || pathname.startsWith('/blog/')
                  ? 'text-accent-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
              )}
            >
              Blog
            </Link>

            {/* Certifications */}
            <Link
              href="/certifications"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                pathname === '/certifications'
                  ? 'text-accent-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
              )}
            >
              Certifications
            </Link>

            {/* Recommend Dropdown */}
            <div className="relative" ref={recommendRef}>
              <button
                onClick={() => {
                  setIsRecommendOpen(!isRecommendOpen);
                  setIsCategoriesOpen(false);
                }}
                className={cn(
                  'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                  pathname.startsWith('/recommend')
                    ? 'text-accent-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                )}
              >
                Recommend
                <ChevronDown className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  isRecommendOpen && 'rotate-180'
                )} />
              </button>

              {/* Dropdown Menu */}
              {isRecommendOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-4 bg-white rounded-xl shadow-xl border border-gray-100 animate-fade-in">
                  {/* Arrow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />
                  
                  <div className="relative space-y-1">
                    {recommendSections.map((section) => {
                      const Icon = recommendIcons[section.slug as keyof typeof recommendIcons];
                      return (
                        <Link
                          key={section.slug}
                          href={`/recommend/${section.slug}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          onClick={() => setIsRecommendOpen(false)}
                        >
                          <Icon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                          <div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 block">
                              {section.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {section.description}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* About */}
            <Link
              href="/about"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                pathname === '/about'
                  ? 'text-accent-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
              )}
            >
              About
            </Link>
          </nav>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated"
                aria-label={link.name}
              >
                {iconMap[link.icon]}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  pathname === '/'
                    ? 'text-accent-primary bg-accent-primary/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                )}
              >
                Home
              </Link>

              {/* Mobile Categories */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => {
                    const Icon = categoryIcons[category.slug as keyof typeof categoryIcons];
                    return (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className={cn(
                          'flex items-center gap-2 p-3 rounded-lg transition-colors',
                          pathname === `/category/${category.slug}`
                            ? 'text-accent-primary bg-accent-primary/10'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{category.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Link
                href="/blog"
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  pathname === '/blog'
                    ? 'text-accent-primary bg-accent-primary/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                )}
              >
                Blog
              </Link>

              <Link
                href="/certifications"
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  pathname === '/certifications'
                    ? 'text-accent-primary bg-accent-primary/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                )}
              >
                Certifications
              </Link>

              {/* Mobile Recommend */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  Recommend
                </p>
                <div className="space-y-1">
                  {recommendSections.map((section) => {
                    const Icon = recommendIcons[section.slug as keyof typeof recommendIcons];
                    return (
                      <Link
                        key={section.slug}
                        href={`/recommend/${section.slug}`}
                        className={cn(
                          'flex items-center gap-2 p-3 rounded-lg transition-colors',
                          pathname === `/recommend/${section.slug}`
                            ? 'text-accent-primary bg-accent-primary/10'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{section.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Link
                href="/about"
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  pathname === '/about'
                    ? 'text-accent-primary bg-accent-primary/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                )}
              >
                About
              </Link>
            </nav>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-4 px-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-text-muted hover:text-text-primary transition-colors"
                    aria-label={link.name}
                  >
                    {iconMap[link.icon]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
