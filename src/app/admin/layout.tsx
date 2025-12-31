import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Admin dashboard for managing the platform.',
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Admin layout - protected by Cloudflare Access in production
 * 
 * To protect this route with Cloudflare Access:
 * 1. Go to Cloudflare Zero Trust dashboard
 * 2. Create an Access Application
 * 3. Set the application domain to your-domain.com/admin/*
 * 4. Configure authentication providers (Google, GitHub, etc.)
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Admin Header */}
      <header className="border-b border-border bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-display font-semibold text-text-primary">
                Admin Dashboard
              </h1>
              <span className="px-2 py-0.5 text-xs bg-accent-primary/10 text-accent-primary rounded-full">
                Protected
              </span>
            </div>
            <nav className="flex items-center gap-4">
              <a
                href="/admin"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Overview
              </a>
              <a
                href="/admin/posts"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Posts
              </a>
              <a
                href="/admin/analytics"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Analytics
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main>{children}</main>
    </div>
  );
}

