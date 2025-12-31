import { ComponentPropsWithoutRef, ReactNode } from 'react';
import Link from 'next/link';
import { CodeBlock, InlineCode } from './CodeBlock';
import { Callout } from './Callout';
import { cn } from '@/lib/utils';

/**
 * MDX component mapping
 */
export const mdxComponents = {
  // Headings with anchor links
  h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => (
    <h1
      className="text-3xl md:text-4xl font-display font-bold text-text-primary mt-12 mb-6 first:mt-0"
      {...props}
    >
      {children}
    </h1>
  ),

  h2: ({ children, id, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      id={id}
      className="text-2xl md:text-3xl font-display font-semibold text-text-primary mt-10 mb-4 scroll-mt-24 group"
      {...props}
    >
      <a href={`#${id}`} className="no-underline hover:text-accent-primary transition-colors">
        {children}
        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">#</span>
      </a>
    </h2>
  ),

  h3: ({ children, id, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      id={id}
      className="text-xl md:text-2xl font-display font-semibold text-text-primary mt-8 mb-3 scroll-mt-24 group"
      {...props}
    >
      <a href={`#${id}`} className="no-underline hover:text-accent-primary transition-colors">
        {children}
        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-lg">#</span>
      </a>
    </h3>
  ),

  h4: ({ children, ...props }: ComponentPropsWithoutRef<'h4'>) => (
    <h4
      className="text-lg font-display font-semibold text-text-primary mt-6 mb-2"
      {...props}
    >
      {children}
    </h4>
  ),

  // Paragraph
  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p
      className="text-text-secondary leading-relaxed mb-4"
      {...props}
    >
      {children}
    </p>
  ),

  // Links
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
    const isExternal = href?.startsWith('http');
    
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline underline-offset-2"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href || '#'}
        className="text-accent-primary hover:underline underline-offset-2"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Lists
  ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="list-disc list-inside space-y-2 mb-4 text-text-secondary"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="list-decimal list-inside space-y-2 mb-4 text-text-secondary"
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),

  // Blockquote
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-accent-primary pl-4 my-6 italic text-text-secondary"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code
  code: ({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    // Check if it's a code block (has language class)
    const isCodeBlock = className?.includes('language-');
    
    if (isCodeBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return <InlineCode className={className}>{children}</InlineCode>;
  },

  pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => {
    // Extract language from children if it's a code element
    const codeElement = children as React.ReactElement<{ className?: string; children?: ReactNode }>;
    const className = codeElement?.props?.className;
    
    return (
      <CodeBlock className={className} {...props}>
        {codeElement?.props?.children}
      </CodeBlock>
    );
  },

  // Horizontal rule
  hr: () => (
    <hr className="my-8 border-border" />
  ),

  // Images
  img: ({ src, alt, ...props }: ComponentPropsWithoutRef<'img'>) => (
    <figure className="my-8">
      <img
        src={src}
        alt={alt || ''}
        className={cn(
          'rounded-xl border border-border',
          'w-full h-auto'
        )}
        loading="lazy"
        {...props}
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-text-muted">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Table
  table: ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto my-6">
      <table
        className="w-full border-collapse border border-border rounded-xl"
        {...props}
      >
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="border border-border bg-bg-elevated px-4 py-2 text-left text-text-primary font-semibold"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: ComponentPropsWithoutRef<'td'>) => (
    <td
      className="border border-border px-4 py-2 text-text-secondary"
      {...props}
    >
      {children}
    </td>
  ),

  // Custom components
  Callout,
  CodeBlock,
};

export { CodeBlock, InlineCode } from './CodeBlock';
export { Callout } from './Callout';

