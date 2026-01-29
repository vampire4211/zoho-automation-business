import 'dotenv/config';
import { createClient } from '@libsql/client';

const dbUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl || !authToken) {
    throw new Error('Missing environment variables');
}

const client = createClient({
    url: dbUrl,
    authToken: authToken,
});

async function runMigration() {
    try {
        console.log('Running analytics & enhancement migration...\n');

        // Add columns to posts table (skip if exists)
        const postsColumns = [
            { name: 'featured_image', sql: 'ALTER TABLE posts ADD COLUMN featured_image TEXT' },
            { name: 'gallery_images', sql: 'ALTER TABLE posts ADD COLUMN gallery_images TEXT' },
            { name: 'video_urls', sql: 'ALTER TABLE posts ADD COLUMN video_urls TEXT' },
            { name: 'tags', sql: 'ALTER TABLE posts ADD COLUMN tags TEXT' },
            { name: 'author', sql: "ALTER TABLE posts ADD COLUMN author TEXT DEFAULT 'J&P Team'" },
            { name: 'view_count', sql: 'ALTER TABLE posts ADD COLUMN view_count INTEGER DEFAULT 0' },
        ];

        console.log('📝 Enhancing posts table...');
        for (const col of postsColumns) {
            try {
                await client.execute(col.sql);
                console.log(`  ✓ Added ${col.name}`);
            } catch (e: any) {
                if (e.message?.includes('duplicate column')) {
                    console.log(`  ⊙ ${col.name} already exists`);
                } else {
                    console.log(`  ✗ Error adding ${col.name}:`, e.message);
                }
            }
        }

        // Add columns to projects table (skip if exists)
        const projectsColumns = [
            { name: 'featured_image', sql: 'ALTER TABLE projects ADD COLUMN featured_image TEXT' },
            { name: 'gallery_images', sql: 'ALTER TABLE projects ADD COLUMN gallery_images TEXT' },
            { name: 'demo_url', sql: 'ALTER TABLE projects ADD COLUMN demo_url TEXT' },
            { name: 'github_url', sql: 'ALTER TABLE projects ADD COLUMN github_url TEXT' },
            { name: 'live_url', sql: 'ALTER TABLE projects ADD COLUMN live_url TEXT' },
            { name: 'technologies', sql: 'ALTER TABLE projects ADD COLUMN technologies TEXT' },
            { name: 'challenges', sql: 'ALTER TABLE projects ADD COLUMN challenges TEXT' },
            { name: 'solutions', sql: 'ALTER TABLE projects ADD COLUMN solutions TEXT' },
            { name: 'results', sql: 'ALTER TABLE projects ADD COLUMN results TEXT' },
            { name: 'view_count', sql: 'ALTER TABLE projects ADD COLUMN view_count INTEGER DEFAULT 0' },
            { name: 'created_at', sql: "ALTER TABLE projects ADD COLUMN created_at INTEGER DEFAULT (strftime('%s', 'now'))" },
        ];

        console.log('\n📂 Enhancing projects table...');
        for (const col of projectsColumns) {
            try {
                await client.execute(col.sql);
                console.log(`  ✓ Added ${col.name}`);
            } catch (e: any) {
                if (e.message?.includes('duplicate column')) {
                    console.log(`  ⊙ ${col.name} already exists`);
                } else {
                    console.log(`  ✗ Error adding ${col.name}:`, e.message);
                }
            }
        }

        // Create page_views table
        console.log('\n📊 Creating analytics tables...');
        try {
            await client.execute(`
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
        )
      `);
            console.log('  ✓ Created page_views table');
        } catch (e: any) {
            console.log('  ⊙ page_views table already exists');
        }

        // Create visitor_sessions table
        try {
            await client.execute(`
        CREATE TABLE visitor_sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          visitor_id TEXT NOT NULL UNIQUE,
          first_visit INTEGER DEFAULT (strftime('%s', 'now')),
          last_visit INTEGER DEFAULT (strftime('%s', 'now')),
          total_visits INTEGER DEFAULT 1,
          total_page_views INTEGER DEFAULT 0,
          email TEXT,
          source TEXT
        )
      `);
            console.log('  ✓ Created visitor_sessions table');
        } catch (e: any) {
            console.log('  ⊙ visitor_sessions table already exists');
        }

        // Create newsletter_subscribers table
        try {
            await client.execute(`
        CREATE TABLE newsletter_subscribers (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          name TEXT,
          visitor_id TEXT,
          subscribed_at INTEGER DEFAULT (strftime('%s', 'now')),
          source TEXT,
          status TEXT DEFAULT 'active'
        )
      `);
            console.log('  ✓ Created newsletter_subscribers table');
        } catch (e: any) {
            console.log('  ⊙ newsletter_subscribers table already exists');
        }

        // Create indexes
        console.log('\n🔍 Creating indexes...');
        const indexes = [
            { name: 'idx_page_views_visitor', sql: 'CREATE INDEX idx_page_views_visitor ON page_views(visitor_id)' },
            { name: 'idx_page_views_path', sql: 'CREATE INDEX idx_page_views_path ON page_views(path)' },
            { name: 'idx_page_views_timestamp', sql: 'CREATE INDEX idx_page_views_timestamp ON page_views(timestamp)' },
            { name: 'idx_visitor_sessions_visitor', sql: 'CREATE INDEX idx_visitor_sessions_visitor ON visitor_sessions(visitor_id)' },
            { name: 'idx_newsletter_email', sql: 'CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email)' },
        ];

        for (const idx of indexes) {
            try {
                await client.execute(idx.sql);
                console.log(`  ✓ Created ${idx.name}`);
            } catch (e: any) {
                if (e.message?.includes('already exists')) {
                    console.log(`  ⊙ ${idx.name} already exists`);
                }
            }
        }

        console.log('\n✅ Migration completed successfully!');
    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
