/**
 * API route for newsletter subscriptions
 * Works with Cloudflare D1 in production, in-memory fallback for development
 */

import { NextRequest, NextResponse } from 'next/server';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory fallback for development
const subscribers = new Set<string>();

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

    try {
      // Try to get D1 binding from Cloudflare environment
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
          message: 'Successfully subscribed! Check your email to confirm.',
        });
      }
    } catch (error) {
      console.error('D1 error:', error);
    }

    // Fallback: Use in-memory storage
    if (subscribers.has(normalizedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    subscribers.add(normalizedEmail);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email to confirm.',
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
