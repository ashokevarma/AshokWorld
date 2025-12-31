'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Star, Clock, ArrowLeft, ExternalLink } from 'lucide-react';

/**
 * Book data - can be moved to a separate data file later
 */
const books = [
  {
    id: 1,
    title: 'Site Reliability Engineering',
    author: 'Google SRE Team',
    category: 'Infrastructure',
    rating: 5,
    readTime: '~15 hours',
    coverColor: 'from-green-500 to-emerald-600',
    summary: 'The definitive guide to how Google runs production systems. Covers everything from eliminating toil to managing incidents.',
    keyTakeaways: [
      'SLOs and error budgets are essential for balancing reliability and velocity',
      'Toil is the enemy - automate everything you can',
      'Postmortems should be blameless and focus on systemic improvements',
      'On-call should be sustainable with proper handoffs and documentation',
    ],
    amazonUrl: 'https://www.amazon.com/Site-Reliability-Engineering-Production-Systems/dp/149192912X',
  },
  {
    id: 2,
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Database',
    rating: 5,
    readTime: '~20 hours',
    coverColor: 'from-blue-500 to-indigo-600',
    summary: 'A masterpiece on distributed systems, data storage, and processing. Essential for anyone building scalable systems.',
    keyTakeaways: [
      'Understand the trade-offs between consistency models',
      'Choose the right data model for your use case',
      'Replication and partitioning strategies matter',
      'Stream processing vs batch processing considerations',
    ],
    amazonUrl: 'https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321',
  },
  {
    id: 3,
    title: 'The Phoenix Project',
    author: 'Gene Kim, Kevin Behr, George Spafford',
    category: 'DevOps',
    rating: 5,
    readTime: '~8 hours',
    coverColor: 'from-orange-500 to-red-600',
    summary: 'A novel about IT, DevOps, and helping your business win. Makes complex concepts accessible through storytelling.',
    keyTakeaways: [
      'The Three Ways: Flow, Feedback, and Continuous Learning',
      'Identify and manage constraints in your workflow',
      'Work in small batches for faster feedback',
      'Build a culture of experimentation and learning',
    ],
    amazonUrl: 'https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/1942788290',
  },
  {
    id: 4,
    title: 'Kubernetes in Action',
    author: 'Marko Lukša',
    category: 'Infrastructure',
    rating: 4,
    readTime: '~18 hours',
    coverColor: 'from-cyan-500 to-blue-600',
    summary: 'Comprehensive guide to Kubernetes covering everything from pods to operators. Great for both beginners and experienced users.',
    keyTakeaways: [
      'Understand the Kubernetes architecture and components',
      'Master pod lifecycle and resource management',
      'Learn patterns for stateful applications',
      'Implement proper security and RBAC',
    ],
    amazonUrl: 'https://www.amazon.com/Kubernetes-Action-Marko-Luksa/dp/1617293725',
  },
  {
    id: 5,
    title: 'The Staff Engineer\'s Path',
    author: 'Tanya Reilly',
    category: 'Leadership',
    rating: 5,
    readTime: '~10 hours',
    coverColor: 'from-purple-500 to-pink-600',
    summary: 'A guide for senior engineers on growing their impact. Covers technical leadership, influence, and navigating organizational complexity.',
    keyTakeaways: [
      'Technical leadership is about enabling others',
      'Learn to see the bigger picture and connect dots',
      'Master the art of influence without authority',
      'Balance depth and breadth in your expertise',
    ],
    amazonUrl: 'https://www.amazon.com/Staff-Engineers-Path-Tanya-Reilly/dp/1098118731',
  },
  {
    id: 6,
    title: 'Building Microservices',
    author: 'Sam Newman',
    category: 'Architecture',
    rating: 4,
    readTime: '~12 hours',
    coverColor: 'from-teal-500 to-green-600',
    summary: 'Practical guide to designing fine-grained systems. Covers decomposition, integration, and deployment strategies.',
    keyTakeaways: [
      'Start with a modular monolith before microservices',
      'Define clear service boundaries using domain-driven design',
      'Embrace eventual consistency where appropriate',
      'Invest in observability and tracing from day one',
    ],
    amazonUrl: 'https://www.amazon.com/Building-Microservices-Designing-Fine-Grained-Systems/dp/1492034029',
  },
];

const categories = ['All', 'Infrastructure', 'Database', 'DevOps', 'Leadership', 'Architecture'];

export default function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter((book) => book.category === selectedCategory);

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
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-display font-bold text-text-primary">
              Recommended Books
            </h1>
          </div>
          <p className="text-lg text-text-secondary max-w-2xl">
            Books that have shaped my understanding of technology, leadership, and building resilient systems. 
            Each includes my personal summary and key takeaways.
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
          Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>

        {/* Books List */}
        <div className="space-y-6">
          {filteredBooks.map((book) => (
            <article
              key={book.id}
              className="group p-6 rounded-2xl bg-bg-secondary border border-border hover:border-border-hover transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Book Cover Placeholder */}
                <div className={`shrink-0 w-32 h-44 rounded-lg bg-gradient-to-br ${book.coverColor} flex items-center justify-center shadow-lg`}>
                  <BookOpen className="w-12 h-12 text-white/80" />
                </div>

                {/* Book Details */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="inline-block px-2 py-1 text-xs bg-bg-elevated border border-border rounded-full text-text-muted mb-2">
                        {book.category}
                      </span>
                      <h2 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                        {book.title}
                      </h2>
                      <p className="text-text-secondary text-sm">by {book.author}</p>
                    </div>
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-2 rounded-lg bg-bg-elevated border border-border hover:border-accent-primary hover:text-accent-primary transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                    <span className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < book.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
                        />
                      ))}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {book.readTime}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-text-secondary mb-4">
                    {book.summary}
                  </p>

                  {/* Key Takeaways */}
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-2">Key Takeaways:</h3>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {book.keyTakeaways.map((takeaway, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="text-accent-primary mt-0.5">▹</span>
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">No books found in this category.</p>
          </div>
        )}

        {/* More Coming */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-bg-elevated border border-border">
          <p className="text-text-secondary">
            More book recommendations coming soon! Have a suggestion?{' '}
            <a href="mailto:ashok.dox@gmail.com" className="text-accent-primary hover:underline">
              Let me know
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
