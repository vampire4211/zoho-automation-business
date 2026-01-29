-- Add new columns to posts table
ALTER TABLE posts ADD COLUMN featured_image TEXT;
ALTER TABLE posts ADD COLUMN gallery_images TEXT;
ALTER TABLE posts ADD COLUMN video_urls TEXT;
ALTER TABLE posts ADD COLUMN tags TEXT;
ALTER TABLE posts ADD COLUMN author TEXT DEFAULT 'J&P Team';
ALTER TABLE posts ADD COLUMN view_count INTEGER DEFAULT 0;

-- Add new columns to projects table
ALTER TABLE projects ADD COLUMN featured_image TEXT;
ALTER TABLE projects ADD COLUMN gallery_images TEXT;
ALTER TABLE projects ADD COLUMN demo_url TEXT;
ALTER TABLE projects ADD COLUMN github_url TEXT;
ALTER TABLE projects ADD COLUMN live_url TEXT;
ALTER TABLE projects ADD COLUMN technologies TEXT;
ALTER TABLE projects ADD COLUMN challenges TEXT;
ALTER TABLE projects ADD COLUMN solutions TEXT;
ALTER TABLE projects ADD COLUMN results TEXT;
ALTER TABLE projects ADD COLUMN view_count INTEGER DEFAULT 0;
ALTER TABLE projects ADD COLUMN created_at INTEGER DEFAULT (strftime('%s', 'now'));

-- Create page_views table
CREATE TABLE page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    visitor_id TEXT NOT NULL,
    path TEXT NOT NULL,
    referrer TEXT,
    user_agent TEXT,
    ip_hash TEXT,
    country TEXT,
    city TEXT,
    device TEXT,
    timestamp INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Create visitor_sessions table
CREATE TABLE visitor_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    visitor_id TEXT NOT NULL UNIQUE,
    first_visit INTEGER DEFAULT (strftime('%s', 'now')),
    last_visit INTEGER DEFAULT (strftime('%s', 'now')),
    total_visits INTEGER DEFAULT 1,
    total_page_views INTEGER DEFAULT 0,
    email TEXT,
    source TEXT
);

-- Create newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    visitor_id TEXT,
    subscribed_at INTEGER DEFAULT (strftime('%s', 'now')),
    source TEXT,
    status TEXT DEFAULT 'active'
);

-- Create indexes for performance
CREATE INDEX idx_page_views_visitor ON page_views(visitor_id);
CREATE INDEX idx_page_views_path ON page_views(path);
CREATE INDEX idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX idx_visitor_sessions_visitor ON visitor_sessions(visitor_id);
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
