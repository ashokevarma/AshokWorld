/**
 * API route for post view tracking
 * Works with Cloudflare D1 in production, in-memory fallback for development
 */

import { NextRequest, NextResponse } from 'next/server';

// Edge runtime for Cloudflare Pages
export const runtime = 'edge';

// In-memory fallback for development
const viewCounts: Record<string, number> = {};

/**
 * GET /api/views?slug=<slug>
 * Get view count for a post
 */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');

  if (!slug) {
    return NextResponse.json(
      { success: false, error: 'Slug is required' },
      { status: 400 }
    );
  }

  try {
    // Try to get D1 binding from Cloudflare environment
    const env = (request as unknown as { env?: { DB?: D1Database } }).env;
    
    if (env?.DB) {
      // Production: Use D1 database
      const result = await env.DB.prepare(
        'SELECT views FROM post_views WHERE slug = ?'
      ).bind(slug).first<{ views: number }>();
      
      return NextResponse.json({
        success: true,
        data: { slug, views: result?.views ?? 0 },
      });
    }
  } catch (error) {
    console.error('D1 error:', error);
  }

  // Fallback: Use in-memory storage
  const views = viewCounts[slug] ?? 0;

  return NextResponse.json({
    success: true,
    data: { slug, views },
  });
}

/**
 * POST /api/views
 * Increment view count for a post
 * Body: { slug: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }

    try {
      // Try to get D1 binding from Cloudflare environment
      const env = (request as unknown as { env?: { DB?: D1Database } }).env;
      
      if (env?.DB) {
        // Production: Use D1 database with upsert
        await env.DB.prepare(`
          INSERT INTO post_views (slug, views) VALUES (?, 1)
          ON CONFLICT(slug) DO UPDATE SET views = views + 1, updated_at = CURRENT_TIMESTAMP
        `).bind(slug).run();
        
        const result = await env.DB.prepare(
          'SELECT views FROM post_views WHERE slug = ?'
        ).bind(slug).first<{ views: number }>();
        
        return NextResponse.json({
          success: true,
          data: { slug, views: result?.views ?? 1 },
        });
      }
    } catch (error) {
      console.error('D1 error:', error);
    }

    // Fallback: Use in-memory storage
    viewCounts[slug] = (viewCounts[slug] ?? 0) + 1;

    return NextResponse.json({
      success: true,
      data: { slug, views: viewCounts[slug] },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// D1 Database type for TypeScript
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  run(): Promise<D1Result>;
}

interface D1Result {
  success: boolean;
}
