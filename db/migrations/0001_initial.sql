-- Migration: Initial schema
-- Created: 2024-12-31

-- Post views table for tracking article views
CREATE TABLE IF NOT EXISTS post_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast slug lookups
CREATE INDEX IF NOT EXISTS idx_post_views_slug ON post_views(slug);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  confirmed INTEGER NOT NULL DEFAULT 0,
  unsubscribed_at TEXT
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Audit log table for tracking admin actions
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  details TEXT,
  performed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  performed_by TEXT
);

-- Index for audit queries
CREATE INDEX IF NOT EXISTS idx_audit_log_performed_at ON audit_log(performed_at);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action);

