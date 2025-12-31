'use client';

import { useState, ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

/**
 * Code block component with copy functionality
 */
export function CodeBlock({
  children,
  className,
  language,
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = extractTextContent(children);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract language from className (e.g., "language-typescript")
  const lang = language || className?.replace('language-', '') || 'text';

  return (
    <div className="relative group my-6">
      {/* Header with filename and language */}
      {(filename || lang !== 'text') && (
        <div className="flex items-center justify-between px-4 py-2 bg-bg-elevated border border-border border-b-0 rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            {filename && (
              <span className="ml-2 text-xs text-text-muted font-mono">
                {filename}
              </span>
            )}
          </div>
          <span className="text-xs text-text-muted uppercase tracking-wider">
            {lang}
          </span>
        </div>
      )}

      {/* Code content */}
      <div
        className={cn(
          'relative overflow-x-auto',
          'bg-bg-secondary border border-border',
          filename || lang !== 'text' ? 'rounded-b-xl' : 'rounded-xl',
          showLineNumbers && 'show-line-numbers'
        )}
      >
        <pre className="p-4 text-sm leading-relaxed">
          <code className={cn('font-mono', className)}>
            {children}
          </code>
        </pre>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={cn(
            'absolute top-3 right-3',
            'p-2 rounded-lg',
            'bg-bg-elevated/80 hover:bg-bg-hover',
            'border border-border',
            'text-text-muted hover:text-text-primary',
            'opacity-0 group-hover:opacity-100',
            'transition-all duration-200'
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * Extract text content from React children
 */
function extractTextContent(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) {
    return children.map(extractTextContent).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return extractTextContent((children as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

/**
 * Inline code component
 */
export function InlineCode({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <code
      className={cn(
        'px-1.5 py-0.5 rounded-md',
        'bg-bg-elevated text-accent-primary',
        'text-sm font-mono',
        className
      )}
    >
      {children}
    </code>
  );
}

export default CodeBlock;

