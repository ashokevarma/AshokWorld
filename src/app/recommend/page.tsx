import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, FileText, Video, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Recommend',
  description: 'Curated recommendations for books, articles, and videos on technology, infrastructure, and cloud.',
};

const sections = [
  {
    slug: 'books',
    name: 'Books',
    description: 'Recommended books with summaries and key takeaways on technology, leadership, and engineering.',
    icon: BookOpen,
    count: '10+ Books',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/5',
    borderColor: 'border-amber-500/20',
  },
  {
    slug: 'articles',
    name: 'Articles',
    description: 'Must-read articles and blog posts from industry experts and thought leaders.',
    icon: FileText,
    count: '50+ Articles',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/5',
    borderColor: 'border-blue-500/20',
  },
  {
    slug: 'videos',
    name: 'Videos',
    description: 'Educational videos, conference talks, tutorials, and deep dives.',
    icon: Video,
    count: '30+ Videos',
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-500/5',
    borderColor: 'border-red-500/20',
  },
];

export default function RecommendPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
            Recommendations
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            A curated collection of resources that have shaped my thinking and helped me grow as an engineer and leader.
          </p>
        </header>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.slug}
                href={`/recommend/${section.slug}`}
                className={`group p-6 rounded-2xl ${section.bgColor} border ${section.borderColor} hover:border-opacity-50 transition-all hover:shadow-lg`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${section.color} text-white mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-display font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                  {section.name}
                </h2>
                <p className="text-text-secondary text-sm mb-4">
                  {section.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">{section.count}</span>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Why These Recommendations */}
        <section className="p-8 rounded-2xl bg-bg-secondary border border-border">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
            Why These Recommendations?
          </h2>
          <div className="prose prose-lg max-w-none text-text-secondary">
            <p>
              Over 22+ years in the industry, I&apos;ve consumed countless books, articles, and videos. 
              These recommendations represent the resources that have had the most significant impact 
              on my career and thinking.
            </p>
            <p>
              Each recommendation includes my personal notes, key takeaways, and how I&apos;ve applied 
              the learnings in real-world scenarios. I hope they prove as valuable to you as they 
              have been to me.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

