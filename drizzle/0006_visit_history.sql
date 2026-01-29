-- Add session_duration column to visitor_sessions table
ALTER TABLE visitor_sessions ADD COLUMN session_duration INTEGER DEFAULT 0;

-- Create visit_history table to track each individual visit/session
CREATE TABLE IF NOT EXISTS visit_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    visitor_id TEXT NOT NULL,
    session_start INTEGER NOT NULL,
    session_end INTEGER NOT NULL,
    duration_seconds INTEGER NOT NULL,
    pages_viewed INTEGER DEFAULT 1,
    entry_page TEXT,
    exit_page TEXT,
    device TEXT,
    source TEXT
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_visit_history_visitor ON visit_history(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visit_history_start ON visit_history(session_start);
