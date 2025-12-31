import { FileText, Eye, Users, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { getAllPosts, getPostCountByCategory } from '@/lib/posts';

/**
 * Admin dashboard page
 * Protected by Cloudflare Access in production
 */
export default function AdminPage() {
  const posts = getAllPosts();
  const counts = getPostCountByCategory();
  const totalPosts = Object.values(counts).reduce((sum, count) => sum + count, 0);

  // Stats overview
  const stats = [
    {
      label: 'Total Posts',
      value: totalPosts,
      icon: FileText,
      change: '+2 this month',
      color: 'text-category-ai',
    },
    {
      label: 'Total Views',
      value: '12,345',
      icon: Eye,
      change: '+15% from last month',
      color: 'text-category-cloud',
    },
    {
      label: 'Subscribers',
      value: '234',
      icon: Users,
      change: '+12 this week',
      color: 'text-category-infra',
    },
    {
      label: 'Avg. Read Time',
      value: '4.2 min',
      icon: TrendingUp,
      change: 'Engagement up',
      color: 'text-category-database',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-text-primary mb-2">
          Welcome back!
        </h2>
        <p className="text-text-secondary">
          Here&apos;s an overview of your platform&apos;s performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-text-muted mb-1">{stat.label}</p>
                  <p className="text-2xl font-display font-bold text-text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-text-muted mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-bg-elevated ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Posts by Category */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Posts by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(counts).map(([category, count]) => {
                const percentage = totalPosts > 0 ? (count / totalPosts) * 100 : 0;
                const colors: Record<string, string> = {
                  ai: 'bg-category-ai',
                  cloud: 'bg-category-cloud',
                  infra: 'bg-category-infra',
                  database: 'bg-category-database',
                };
                
                return (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-secondary capitalize">{category}</span>
                      <span className="text-text-muted">{count} posts</span>
                    </div>
                    <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors[category]} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.slice(0, 5).map((post) => (
                <div
                  key={post.slug}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-text-muted">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="ml-4 px-2 py-0.5 text-xs rounded-full bg-bg-elevated text-text-muted capitalize">
                    {post.category}
                  </span>
                </div>
              ))}
              {posts.length === 0 && (
                <p className="text-sm text-text-muted text-center py-4">
                  No posts yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 rounded-lg bg-accent-primary text-bg-primary text-sm font-medium hover:bg-accent-primary/90 transition-colors">
              Create New Post
            </button>
            <button className="px-4 py-2 rounded-lg bg-bg-elevated border border-border text-text-secondary text-sm font-medium hover:border-border-hover hover:text-text-primary transition-colors">
              View Analytics
            </button>
            <button className="px-4 py-2 rounded-lg bg-bg-elevated border border-border text-text-secondary text-sm font-medium hover:border-border-hover hover:text-text-primary transition-colors">
              Manage Subscribers
            </button>
            <button className="px-4 py-2 rounded-lg bg-bg-elevated border border-border text-text-secondary text-sm font-medium hover:border-border-hover hover:text-text-primary transition-colors">
              Export Data
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Cloudflare Access Info */}
      <div className="mt-8 p-4 rounded-lg bg-bg-secondary border border-border">
        <p className="text-sm text-text-muted">
          <strong className="text-text-secondary">Security Note:</strong> This admin section 
          should be protected by Cloudflare Access in production. Configure your Access 
          Application in the Cloudflare Zero Trust dashboard to restrict access to authorized users only.
        </p>
      </div>
    </div>
  );
}

