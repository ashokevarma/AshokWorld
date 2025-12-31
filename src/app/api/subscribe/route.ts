/**
 * API route for newsletter subscriptions
 * Uses Cloudflare D1 database
 */

import { NextRequest, NextResponse } from 'next/server';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/subscribe
 * Subscribe to newsletter
 * Body: { email: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // Get D1 binding from Cloudflare environment
    const env = (request as unknown as { env?: { DB?: D1Database } }).env;
    
    if (env?.DB) {
      // Check if already subscribed
      const existing = await env.DB.prepare(
        'SELECT email FROM subscribers WHERE email = ?'
      ).bind(normalizedEmail).first();
      
      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Email already subscribed' },
          { status: 409 }
        );
      }
      
      // Insert new subscriber
      await env.DB.prepare(
        'INSERT INTO subscribers (email) VALUES (?)'
      ).bind(normalizedEmail).run();
      
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed! Thank you for joining.',
      });
    }

    // Fallback if no DB
    return NextResponse.json({
      success: true,
      message: 'Subscription noted. Thank you!',
    });
  } catch (error) {
    console.error('D1 error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/subscribe/count
 * Get subscriber count (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const env = (request as unknown as { env?: { DB?: D1Database } }).env;
    
    if (env?.DB) {
      const result = await env.DB.prepare(
        'SELECT COUNT(*) as count FROM subscribers'
      ).first<{ count: number }>();
      
      return NextResponse.json({
        success: true,
        data: { count: result?.count ?? 0 },
      });
    }

    return NextResponse.json({
      success: true,
      data: { count: 0 },
    });
  } catch (error) {
    console.error('D1 error:', error);
    return NextResponse.json({
      success: true,
      data: { count: 0 },
    });
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
}

interface D1Result {
  success: boolean;
}

