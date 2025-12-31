/**
 * Database client for Cloudflare D1
 * 
 * Note: D1 bindings are only available in Cloudflare Workers runtime.
 * For local development, use wrangler dev or mock the database.
 */

import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import * as schema from '../../db/schema';

/**
 * D1 Database binding type
 */
export interface Env {
  DB: D1Database;
}

/**
 * Create a Drizzle database client from D1 binding
 */
export function createDb(d1: D1Database) {
  return drizzle(d1, { schema });
}

/**
 * Type for the database client
 */
export type Database = ReturnType<typeof createDb>;

/**
 * Increment view count for a post
 */
export async function incrementViewCount(db: Database, slug: string): Promise<number> {
  // Try to insert, or update if exists
  const existing = await db.query.postViews.findFirst({
    where: eq(schema.postViews.slug, slug),
  });

  if (existing) {
    const result = await db
      .update(schema.postViews)
      .set({
        views: existing.views + 1,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.postViews.slug, slug))
      .returning({ views: schema.postViews.views });
    return result[0]?.views ?? existing.views + 1;
  } else {
    await db.insert(schema.postViews).values({ slug, views: 1 });
    return 1;
  }
}

/**
 * Get view count for a post
 */
export async function getViewCount(db: Database, slug: string): Promise<number> {
  const result = await db.query.postViews.findFirst({
    where: eq(schema.postViews.slug, slug),
  });

  return result?.views ?? 0;
}

/**
 * Get all view counts
 */
export async function getAllViewCounts(db: Database): Promise<Record<string, number>> {
  const results = await db.query.postViews.findMany();
  
  return results.reduce((acc, row) => {
    acc[row.slug] = row.views;
    return acc;
  }, {} as Record<string, number>);
}

/**
 * Add a newsletter subscriber
 */
export async function addSubscriber(db: Database, email: string): Promise<boolean> {
  try {
    await db.insert(schema.subscribers).values({ email });
    return true;
  } catch {
    // Email already exists
    return false;
  }
}

/**
 * Confirm a subscriber
 */
export async function confirmSubscriber(db: Database, email: string): Promise<boolean> {
  const result = await db
    .update(schema.subscribers)
    .set({ confirmed: true })
    .where(eq(schema.subscribers.email, email))
    .returning();

  return result.length > 0;
}

/**
 * Log an admin action
 */
export async function logAuditAction(
  db: Database,
  action: string,
  details?: string,
  performedBy?: string
): Promise<void> {
  await db.insert(schema.auditLog).values({
    action,
    details,
    performedBy,
  });
}
