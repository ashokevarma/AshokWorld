'use client';

import { useState, useEffect } from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { getQuoteOfTheDay, Quote as QuoteType } from '@/lib/quotes';

/**
 * Quote of the Day component
 * Displays an inspirational quote that changes daily
 */
export function QuoteOfTheDay() {
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setQuote(getQuoteOfTheDay());
  }, []);

  if (!quote) {
    return (
      <div className="flex items-center gap-2 text-text-muted">
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Collapsed view */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 transition-all duration-300 hover:opacity-80 text-left"
        title="Quote of the Day - Click to expand"
      >
        <div className="flex-shrink-0 p-1.5 sm:p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg shadow-md">
          <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
        <div className="min-w-0 hidden md:block">
          <p className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider">
            Quote of the Day
          </p>
          <p className="text-xs lg:text-sm text-text-secondary line-clamp-1 max-w-[180px] lg:max-w-[280px] xl:max-w-[350px]">
            &ldquo;{quote.text}&rdquo;
          </p>
        </div>
      </button>

      {/* Expanded view - full quote */}
      {isExpanded && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsExpanded(false)}
          />
          
          {/* Quote card */}
          <div className="absolute top-full left-0 mt-2 z-50 w-[280px] sm:w-80 p-4 bg-bg-elevated rounded-xl shadow-2xl border border-border animate-fade-in">
            <div className="relative">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                    Quote of the Day
                  </p>
                  <p className="text-xs text-text-muted capitalize">
                    Theme: {quote.category}
                  </p>
                </div>
              </div>
              
              <blockquote className="text-text-secondary text-sm leading-relaxed mb-3 italic border-l-2 border-amber-400 pl-3">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              
              <p className="text-right text-xs font-semibold text-text-muted">
                — {quote.author}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default QuoteOfTheDay;
