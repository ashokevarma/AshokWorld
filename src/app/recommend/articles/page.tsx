'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, ExternalLink, Calendar, User } from 'lucide-react';

/**
 * Article data
 */
const articles = [
  {
    id: 1,
    title: 'The Twelve-Factor App',
    author: 'Heroku',
    source: 'twelve-factor.net',
    category: 'Architecture',
    url: 'https://12factor.net/',
    description: 'A methodology for building software-as-a-service apps. Essential reading for anyone building cloud-native applications.',
    year: '2017',
  },
  {
    id: 2,
    title: 'Scaling to 100k Users',
    author: 'Alex Xu',
    source: 'ByteByteGo',
    category: 'System Design',
    url: 'https://bytebytego.com/',
    description: 'Practical guide on scaling web applications from zero to 100,000 users with real-world examples.',
    year: '2023',
  },
  {
    id: 3,
    title: 'What I Wish I Had Known Before Scaling Uber',
    author: 'Matt Ranney',
    source: 'InfoQ',
    category: 'Infrastructure',
    url: 'https://www.infoq.com/',
    description: 'Lessons learned from scaling Uber\'s infrastructure. Covers microservices, observability, and team dynamics.',
    year: '2020',
  },
  {
    id: 4,
    title: 'How We Build and Run the Software That Powers Cloudflare',
    author: 'Cloudflare Team',
    source: 'Cloudflare Blog',
    category: 'Cloud',
    url: 'https://blog.cloudflare.com/',
    description: 'Deep dive into Cloudflare\'s architecture, deployment practices, and engineering culture.',
    year: '2022',
  },
  {
    id: 5,
    title: 'Google\'s Approach to Observability',
    author: 'Google SRE',
    source: 'Google Cloud Blog',
    category: 'Observability',
    url: 'https://cloud.google.com/blog/',
    description: 'How Google thinks about observability, metrics, and debugging production systems at scale.',
    year: '2021',
  },
  {
    id: 6,
    title: 'On Being A Senior Engineer',
    author: 'John Allspaw',
    source: 'Kitchen Soap',
    category: 'Career',
    url: 'https://www.kitchensoap.com/2012/10/25/on-being-a-senior-engineer/',
    description: 'Classic article on what it means to be a senior engineer. Focus on mature engineering practices and behavior.',
    year: '2012',
  },
  {
    id: 7,
    title: 'Kubernetes Best Practices',
    author: 'Google Cloud',
    source: 'Google Cloud',
    category: 'Kubernetes',
    url: 'https://cloud.google.com/kubernetes-engine/docs/best-practices',
    description: 'Official best practices for running Kubernetes in production from Google\'s experience with GKE.',
    year: '2023',
  },
  {
    id: 8,
    title: 'AWS Well-Architected Framework',
    author: 'AWS',
    source: 'AWS',
    category: 'Cloud',
    url: 'https://aws.amazon.com/architecture/well-architected/',
    description: 'Comprehensive guide to building secure, high-performing, resilient, and efficient infrastructure on AWS.',
    year: '2023',
  },
];

const categories = ['All', 'Architecture', 'System Design', 'Infrastructure', 'Cloud', 'Kubernetes', 'Career', 'Observability'];

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter((article) => article.category === selectedCategory);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/recommend"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recommendations
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-display font-bold text-text-primary">
              Recommended Articles
            </h1>
          </div>
          <p className="text-lg text-text-secondary max-w-2xl">
            Must-read articles and blog posts from industry experts. These resources have helped me 
            understand complex topics and stay updated with best practices.
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === selectedCategory
                  ? 'bg-accent-primary text-bg-primary'
                  : 'bg-bg-elevated text-text-secondary border border-border hover:border-border-hover hover:text-text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-text-muted mb-6">
          Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-xl bg-bg-secondary border border-border hover:border-accent-primary/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="inline-block px-2 py-1 text-xs bg-bg-elevated border border-border rounded-full text-text-muted">
                  {article.category}
                </span>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent-primary transition-colors" />
              </div>

              <h2 className="text-lg font-display font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-2">
                {article.title}
              </h2>

              <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                {article.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {article.year}
                </span>
                <span className="text-accent-primary">
                  {article.source}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* No results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">No articles found in this category.</p>
          </div>
        )}

        {/* More Coming */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-bg-elevated border border-border">
          <p className="text-text-secondary">
            More article recommendations coming soon! Have a suggestion?{' '}
            <a href="mailto:ashok.dox@gmail.com" className="text-accent-primary hover:underline">
              Let me know
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
