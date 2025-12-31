/**
 * API route for post view tracking
 * Uses Cloudflare D1 database
 */

import { NextRequest, NextResponse } from 'next/server';

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
    // Get D1 binding from Cloudflare environment
    const env = (request as unknown as { env?: { DB?: D1Database } }).env;
    
    if (env?.DB) {
      const result = await env.DB.prepare(
        'SELECT views FROM post_views WHERE slug = ?'
      ).bind(slug).first<{ views: number }>();
      
      return NextResponse.json({
        success: true,
        data: { slug, views: result?.views ?? 0 },
      });
    }

    // Fallback if no DB
    return NextResponse.json({
      success: true,
      data: { slug, views: 0 },
    });
  } catch (error) {
    console.error('D1 error:', error);
    return NextResponse.json({
      success: true,
      data: { slug, views: 0 },
    });
  }
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

    // Get D1 binding from Cloudflare environment
    const env = (request as unknown as { env?: { DB?: D1Database } }).env;
    
    if (env?.DB) {
      // Upsert: Insert or update view count
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

    // Fallback if no DB
    return NextResponse.json({
      success: true,
      data: { slug, views: 1 },
    });
  } catch (error) {
    console.error('D1 error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track view' },
      { status: 500 }
    );
  }
}

// D1 Database type
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  run(): Promise<D1Result>;
  all<T = unknown>(): Promise<{ results: T[] }>;
}

interface D1Result {
  success: boolean;
}

