'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Video, ArrowLeft, Clock, User, Play } from 'lucide-react';

/**
 * Video data
 */
const videos = [
  {
    id: 1,
    title: 'Scaling Instagram Infrastructure',
    speaker: 'Lisa Guo',
    event: 'QCon',
    category: 'Infrastructure',
    duration: '45 min',
    url: 'https://www.youtube.com/watch?v=example1',
    thumbnail: '🎬',
    description: 'Deep dive into how Instagram scales their infrastructure to support billions of users.',
    year: '2022',
  },
  {
    id: 2,
    title: 'Kubernetes Best Practices',
    speaker: 'Kelsey Hightower',
    event: 'KubeCon',
    category: 'Kubernetes',
    duration: '35 min',
    url: 'https://www.youtube.com/watch?v=example2',
    thumbnail: '☸️',
    description: 'Essential best practices for running Kubernetes in production from one of the most respected voices in the community.',
    year: '2023',
  },
  {
    id: 3,
    title: 'The Art of Code Review',
    speaker: 'Trisha Gee',
    event: 'DevTernity',
    category: 'Engineering',
    duration: '50 min',
    url: 'https://www.youtube.com/watch?v=example3',
    thumbnail: '👩‍💻',
    description: 'How to give and receive constructive code reviews that improve both code quality and team dynamics.',
    year: '2021',
  },
  {
    id: 4,
    title: 'Observability at Scale',
    speaker: 'Charity Majors',
    event: 'Monitorama',
    category: 'Observability',
    duration: '40 min',
    url: 'https://www.youtube.com/watch?v=example4',
    thumbnail: '📊',
    description: 'Modern approaches to observability, tracing, and debugging distributed systems.',
    year: '2022',
  },
  {
    id: 5,
    title: 'AWS re:Invent - What\'s New',
    speaker: 'Werner Vogels',
    event: 'AWS re:Invent',
    category: 'Cloud',
    duration: '90 min',
    url: 'https://www.youtube.com/watch?v=example5',
    thumbnail: '☁️',
    description: 'Annual keynote covering the latest AWS innovations and architectural patterns.',
    year: '2023',
  },
  {
    id: 6,
    title: 'Building Reliable Distributed Systems',
    speaker: 'Martin Kleppmann',
    event: 'Strange Loop',
    category: 'Distributed Systems',
    duration: '55 min',
    url: 'https://www.youtube.com/watch?v=example6',
    thumbnail: '🔗',
    description: 'Fundamental concepts for building reliable distributed systems, from the author of DDIA.',
    year: '2020',
  },
  {
    id: 7,
    title: 'GitOps and Progressive Delivery',
    speaker: 'Weaveworks Team',
    event: 'CNCF Webinar',
    category: 'DevOps',
    duration: '30 min',
    url: 'https://www.youtube.com/watch?v=example7',
    thumbnail: '🚀',
    description: 'Introduction to GitOps principles and implementing progressive delivery with Argo and Flux.',
    year: '2023',
  },
  {
    id: 8,
    title: 'Database Internals Deep Dive',
    speaker: 'Andy Pavlo',
    event: 'CMU Database Course',
    category: 'Database',
    duration: '75 min',
    url: 'https://www.youtube.com/watch?v=example8',
    thumbnail: '🗄️',
    description: 'Comprehensive look at database internals including storage engines, indexing, and query optimization.',
    year: '2022',
  },
];

const categories = ['All', 'Infrastructure', 'Kubernetes', 'Cloud', 'Database', 'DevOps', 'Observability', 'Engineering', 'Distributed Systems'];

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter((video) => video.category === selectedCategory);

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
            <div className="p-3 rounded-xl bg-red-500/10 text-red-500">
              <Video className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-display font-bold text-text-primary">
              Recommended Videos
            </h1>
          </div>
          <p className="text-lg text-text-secondary max-w-2xl">
            Conference talks, tutorials, and educational videos that provide deep insights 
            into technology, architecture, and engineering practices.
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
          Showing {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredVideos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl bg-bg-secondary border border-border hover:border-accent-primary/50 transition-all overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-bg-elevated to-bg-primary flex items-center justify-center">
                <span className="text-6xl">{video.thumbnail}</span>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-accent-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-100 scale-75">
                    <Play className="w-6 h-6 text-bg-primary ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="inline-block px-2 py-0.5 text-xs bg-bg-elevated border border-border rounded-full text-text-muted">
                    {video.category}
                  </span>
                  <span className="text-xs text-text-muted">{video.year}</span>
                </div>

                <h2 className="text-lg font-display font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-2 line-clamp-2">
                  {video.title}
                </h2>

                <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                  {video.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {video.speaker}
                  </span>
                  <span className="text-accent-primary">
                    {video.event}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* No results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">No videos found in this category.</p>
          </div>
        )}

        {/* More Coming */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-bg-elevated border border-border">
          <p className="text-text-secondary">
            More video recommendations coming soon! Have a suggestion?{' '}
            <a href="mailto:ashok.dox@gmail.com" className="text-accent-primary hover:underline">
              Let me know
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
