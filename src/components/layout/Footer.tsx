import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { siteConfig, navItems, categories } from '@/lib/config';

/**
 * Footer component
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-secondary/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <h3 className="text-xl font-display font-bold text-text-primary">
                {siteConfig.name}
              </h3>
            </Link>
            <p className="mt-4 text-text-secondary text-sm leading-relaxed max-w-md">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="mt-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Categories
            </h4>
            <ul className="mt-4 space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-sm text-text-muted flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-category-ai" /> using Next.js & Cloudflare
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

