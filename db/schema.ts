import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * Post views table - tracks view counts per post
 */
export const postViews = sqliteTable('post_views', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  views: integer('views').default(0).notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

/**
 * Newsletter subscribers table
 */
export const subscribers = sqliteTable('subscribers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  subscribedAt: text('subscribed_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  confirmed: integer('confirmed', { mode: 'boolean' }).default(false).notNull(),
  unsubscribedAt: text('unsubscribed_at'),
});

/**
 * Audit log table - tracks admin actions
 */
export const auditLog = sqliteTable('audit_log', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  action: text('action').notNull(),
  details: text('details'),
  performedAt: text('performed_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  performedBy: text('performed_by'),
});

/**
 * Type exports for use in application
 */
export type PostView = typeof postViews.$inferSelect;
export type NewPostView = typeof postViews.$inferInsert;

export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;

export type AuditLogEntry = typeof auditLog.$inferSelect;
export type NewAuditLogEntry = typeof auditLog.$inferInsert;
