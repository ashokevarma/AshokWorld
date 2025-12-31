import { compileMDX } from 'next-mdx-remote/rsc';
import { ReactElement } from 'react';
import { getHighlighter, type Highlighter } from 'shiki';
import { mdxComponents } from '@/components/mdx';

let highlighter: Highlighter | null = null;

/**
 * Get or create Shiki highlighter
 */
async function getOrCreateHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await getHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: [
        'typescript',
        'javascript',
        'jsx',
        'tsx',
        'python',
        'go',
        'rust',
        'sql',
        'bash',
        'shell',
        'json',
        'yaml',
        'markdown',
        'html',
        'css',
        'dockerfile',
      ],
    });
  }
  return highlighter;
}

/**
 * Highlight code with Shiki
 */
export async function highlightCode(code: string, lang: string): Promise<string> {
  const hl = await getOrCreateHighlighter();
  
  try {
    return hl.codeToHtml(code, {
      lang: lang || 'text',
      theme: 'github-dark',
    });
  } catch {
    // Fallback for unsupported languages
    return hl.codeToHtml(code, {
      lang: 'text',
      theme: 'github-dark',
    });
  }
}

/**
 * Compile MDX content to React component
 */
export async function compileMdxContent(source: string): Promise<{
  content: ReactElement;
  frontmatter: Record<string, unknown>;
}> {
  const result = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    },
  });

  return {
    content: result.content,
    frontmatter: result.frontmatter as Record<string, unknown>,
  };
}

/**
 * Process code blocks in MDX content
 * This is a utility for custom code block processing if needed
 */
export function processCodeBlocks(content: string): string {
  // Add language labels to code blocks
  const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;
  
  return content.replace(codeBlockRegex, (_, lang, code) => {
    return `\`\`\`${lang}\n${code.trim()}\n\`\`\``;
  });
}

/**
 * Extract code blocks from MDX for separate processing
 */
export function extractCodeBlocks(content: string): {
  blocks: { lang: string; code: string; index: number }[];
  cleanContent: string;
} {
  const blocks: { lang: string; code: string; index: number }[] = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  
  let index = 0;
  const cleanContent = content.replace(codeBlockRegex, (_, lang = 'text', code) => {
    blocks.push({ lang, code: code.trim(), index });
    const placeholder = `__CODE_BLOCK_${index}__`;
    index++;
    return placeholder;
  });

  return { blocks, cleanContent };
}

/**
 * Restore processed code blocks
 */
export function restoreCodeBlocks(
  content: string,
  highlightedBlocks: Map<number, string>
): string {
  let result = content;
  
  highlightedBlocks.forEach((html, index) => {
    result = result.replace(`__CODE_BLOCK_${index}__`, html);
  });

  return result;
}

