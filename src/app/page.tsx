import { Hero } from '@/components/home/Hero';
import { LatestPosts } from '@/components/home/LatestPosts';
import { TechStack } from '@/components/home/TechStack';
import { getLatestPosts } from '@/lib/posts';

/**
 * Homepage - Personal brand landing page with latest posts
 */
export default function HomePage() {
  const latestPosts = getLatestPosts(6);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Latest Posts Section */}
      <LatestPosts posts={latestPosts} />

      {/* Tech Stack Section */}
      <TechStack />

      {/* Newsletter Section */}
      <section className="py-20 bg-bg-secondary/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-text-primary mb-4">
            Stay Updated
          </h2>
          <p className="text-text-secondary mb-8">
            Get notified when I publish new articles. No spam, unsubscribe anytime.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-bg-elevated border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-accent-primary text-bg-primary font-medium hover:bg-accent-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-text-muted mt-4">
            I respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </>
  );
}

