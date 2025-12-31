'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

/**
 * 404 Not Found page
 */
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 illustration */}
        <div className="relative mb-8">
          <div className="text-[150px] md:text-[200px] font-display font-bold text-bg-elevated leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">🔍</div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
          Page Not Found
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button leftIcon={<Home className="w-4 h-4" />}>
              Go Home
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2"
          >
            <Button variant="secondary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Go Back
            </Button>
          </button>
        </div>
      </div>
    </div>
  );
}

